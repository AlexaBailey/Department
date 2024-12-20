const { User } = require('../model/User'); // Assuming User is a Sequelize model

// Get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll(); // Fetch all users
		if (!users || users.length === 0) {
			return res.status(204).json({ message: 'No users found' });
		}
		res.json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ message: 'Failed to fetch users' });
	}
};

// Delete a user
const deleteUser = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({ message: 'User ID required' });

	try {
		const user = await User.findByPk(req.body.id); // Find user by primary key
		if (!user) {
			return res
				.status(204)
				.json({ message: `User ID ${req.body.id} not found` });
		}
		const result = await user.destroy(); // Delete the user
		res.json(result);
	} catch (err) {
		console.error('Error deleting user:', err);
		res.status(500).json({ message: 'Failed to delete user' });
	}
};

// Get a specific user
const getUser = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).json({ message: 'User ID required' });

	try {
		const user = await User.findByPk(req.params.id); // Find user by primary key
		if (!user) {
			return res
				.status(204)
				.json({ message: `User ID ${req.params.id} not found` });
		}
		res.json(user);
	} catch (err) {
		console.error('Error fetching user:', err);
		res.status(500).json({ message: 'Failed to fetch user' });
	}
};

module.exports = {
	getAllUsers,
	deleteUser,
	getUser,
};
