import {Pool} from "pg";
import {envConfig} from "./env.js";

const pool = new Pool({
    user: envConfig.DB_USER,
    host: envConfig.DB_HOST,
    database: envConfig.DB_NAME,
    password: envConfig.DB_PASSWORD,
    port: envConfig.DB_PORT,
})

export {pool};