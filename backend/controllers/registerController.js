const { User } = require('../model/User'); // Assuming User is a Sequelize model
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });

	try {
		// Check for duplicate usernames in the database
		const duplicate = await User.findOne({ where: { username: user } });
		if (duplicate) return res.sendStatus(409); // Conflict

		// Encrypt the password
		const hashedPwd = await bcrypt.hash(pwd, 10);

		// Create and store the new user
		const result = await User.create({
			username: user,
			password: hashedPwd,
		});

		console.log(result);

		res.status(201).json({ success: `New user ${user} created!` });
	} catch (err) {
		console.error('Error creating user:', err);
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleNewUser };
