import app from './app.js';
import { pool } from './config/db.js';
import { envConfig } from './config/env.js';

const startServer = async () => {
    try {
        // Test raw connection
        const testQuery = await pool.query('SELECT $1::text as message', ['Database connection test']);
        console.log('✅ Database connected:', testQuery.rows[0].message);

        const PORT = envConfig.PORT;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(envConfig.DB_PASSWORD);
        console.error('❌ FATAL DATABASE CONNECTION ERROR:');
        console.error(err.stack);
        process.exit(1);
    }
};

// Start application
startServer();