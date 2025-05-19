import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnv = () => {
    const environment = process.env.NODE_ENV || "dev"; // Default ke dev

    // Path ke folder environment di root project
    const envPath = path.resolve(
        __dirname,
        "../environment/.env.dev" // Sesuaikan dengan struktur folder
    );

    // Debug: Tampilkan path yang digunakan
    console.log("Loading env from:", envPath);

    // Load file .env
    const result = config({ path: envPath });

    if (result.error) {
        throw new Error(`❌ Gagal load .env: ${result.error.message}`);
    }

    // Validasi variable wajib
    const requiredVars = ["DB_HOST", "DB_USER", "DB_PASSWORD"];
    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            throw new Error(`Missing ${varName} in .env file`);
        }
    });

    return {
        NODE_ENV: environment,
        PORT: process.env.PORT || 3000,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT || 5432,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD.toString(), // Konversi ke string
        DB_NAME: process.env.DB_NAME || "zagportfolio",
        PAGINATION_LIMIT: parseInt(process.env.PAGINATION_LIMIT) || 10
    };
};

export const envConfig = loadEnv();