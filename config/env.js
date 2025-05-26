import dotenv from 'dotenv';
import fs from 'fs';

function loadEnv() {
    if (process.env.NODE_ENV === 'production') {
        // Production: tidak load file .env, langsung gunakan environment variables
        console.log('⚠️ Production mode detected, skip loading .env file');
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
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

export const envConfig = {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
};