const sequelize = require('../config/database');

const User = sequelize.define('User', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	roles: {
		type: DataTypes.JSONB,
		defaultValue: { User: 0 },
	},
	refreshToken: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		defaultValue: [],
	},
});

module.exports = { User };
