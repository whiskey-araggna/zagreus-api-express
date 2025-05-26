import dotenv from 'dotenv';
import fs from 'fs';

function loadEnv() {
    if (process.env.NODE_ENV === 'production') {
        // Production: tidak load file .env, langsung gunakan environment variables
        console.log('⚠️ Production mode detected, skip loading .env file');
        return;
    }

    const envPath = process.env.DOTENV_CONFIG_PATH || './environment/.env.dev';

    if (fs.existsSync(envPath)) {
        const result = dotenv.config({ path: envPath });
        if (result.error) {
            throw new Error(`❌ Gagal load .env: ${result.error.message}`);
        } else {
            console.log(`✅ Loaded env file: ${envPath}`);
        }
    } else {
        console.warn(`⚠️ File env tidak ditemukan di ${envPath}, lanjut tanpa file .env`);
    }
}

loadEnv();
