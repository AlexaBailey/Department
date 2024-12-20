const { User } = require('../model/User'); // Assuming User is a Sequelize model

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); // No content
	const refreshToken = cookies.jwt;

	try {
		// Check if refreshToken exists in the database
		const foundUser = await User.findOne({
			where: { refreshToken: { [Sequelize.Op.contains]: [refreshToken] } }, // Check if the array contains the token
		});

		if (!foundUser) {
			// If no user found, clear the cookie and return 204
			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
			});
			return res.sendStatus(204); // No content
		}

		// Remove the refresh token from the array
		const newRefreshTokenArray = foundUser.refreshToken.filter(
			(rt) => rt !== refreshToken,
		);
		foundUser.refreshToken = newRefreshTokenArray;

		// Save updated user to the database
		await foundUser.save();
		console.log('Updated User:', foundUser);

		// Clear the cookie
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		});
		res.sendStatus(204); // No content
	} catch (error) {
		console.error('Error during logout:', error);
		res.sendStatus(500); // Internal server error
	}
};

module.exports = { handleLogout };
