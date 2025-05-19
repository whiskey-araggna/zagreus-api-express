import portfolioRoutes from "./portfolioRoutes.js";

const routes = (app) => {
    app.use('/portfolio', portfolioRoutes);
}

export default routes;