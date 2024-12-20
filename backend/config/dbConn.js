const { Pool } = require('pg'); // Import the pg library
require('dotenv').config(); // Load environment variables

const pool = new Pool({
	connectionString: process.env.DATABASE_URI, // PostgreSQL connection string
});

const connectDB = async () => {
	try {
		await pool.connect();
		console.log('Connected to PostgreSQL successfully!');
	} catch (err) {
		console.error('Error connecting to PostgreSQL:', err.message);
		process.exit(1); // Exit the process with failure
	}
};

module.exports = { connectDB, pool };
