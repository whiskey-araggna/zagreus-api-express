import routes from "./routes/index.js";
import express from "express";

const app = express();
routes(app);

export default app;