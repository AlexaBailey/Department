const { User } = require('../model/User'); // Assuming User is a Sequelize model
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
	const refreshToken = cookies.jwt;
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

	try {
		// Find the user with the provided refresh token
		const foundUser = await User.findOne({
			where: { refreshToken: { [Sequelize.Op.contains]: [refreshToken] } },
		});

		// Detected refresh token reuse
		if (!foundUser) {
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				async (err, decoded) => {
					if (err) return res.sendStatus(403); // Forbidden
					console.log('attempted refresh token reuse!');

					// Find the user by username and clear their refresh tokens
					const hackedUser = await User.findOne({
						where: { username: decoded.username },
					});
					if (hackedUser) {
						hackedUser.refreshToken = [];
						await hackedUser.save();
						console.log('Cleared hacked user tokens:', hackedUser);
					}
				},
			);
			return res.sendStatus(403); // Forbidden
		}

		// Filter out the old refresh token from the user's array
		const newRefreshTokenArray = foundUser.refreshToken.filter(
			(rt) => rt !== refreshToken,
		);

		// Verify the JWT
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) {
					console.log('expired refresh token');
					foundUser.refreshToken = [...newRefreshTokenArray];
					await foundUser.save();
					return res.sendStatus(403); // Forbidden
				}

				if (err || foundUser.username !== decoded.username) {
					return res.sendStatus(403); // Forbidden
				}

				// Refresh token was valid
				const roles = foundUser.roles ? Object.values(foundUser.roles) : [];
				const accessToken = jwt.sign(
					{
						UserInfo: {
							username: decoded.username,
							roles: roles,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '10s' },
				);

				const newRefreshToken = jwt.sign(
					{ username: foundUser.username },
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: '1d' },
				);

				// Save the new refresh token in the database
				foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
				await foundUser.save();

				// Create a secure cookie with the new refresh token
				res.cookie('jwt', newRefreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: 'None',
					maxAge: 24 * 60 * 60 * 1000,
				});

				res.json({ roles, accessToken });
			},
		);
	} catch (error) {
		console.error('Error during refresh token handling:', error);
		res.sendStatus(500); // Internal Server Error
	}
};

module.exports = { handleRefreshToken };
