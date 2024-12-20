const { User } = require('../model/User'); // Assuming User is a Sequelize model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const cookies = req.cookies;
	console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });

	// Find the user in the database
	const foundUser = await User.findOne({ where: { username: user } });
	if (!foundUser) return res.sendStatus(401); // Unauthorized

	// Evaluate the password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		const roles = foundUser.roles
			? Object.values(foundUser.roles).filter(Boolean)
			: []; // Ensure roles are parsed correctly

		// Create JWTs
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
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

		// Manage refresh tokens
		let newRefreshTokenArray = !cookies?.jwt
			? foundUser.refreshToken
			: foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

		if (cookies?.jwt) {
			const refreshToken = cookies.jwt;

			// Check if refresh token reuse occurred
			const foundToken = await User.findOne({
				where: { refreshToken: refreshToken },
			});

			if (!foundToken) {
				console.log('attempted refresh token reuse at login!');
				// Clear all previous refresh tokens
				newRefreshTokenArray = [];
			}

			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
			});
		}

		// Save the new refresh token array to the user
		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
		await foundUser.save();

		console.log(foundUser.refreshToken);
		console.log(roles);

		// Create a secure cookie with the new refresh token
		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 24 * 60 * 60 * 1000,
		});

		// Send the access token and roles back to the user
		res.json({ roles, accessToken });
	} else {
		res.sendStatus(401); // Unauthorized
	}
};

module.exports = { handleLogin };
