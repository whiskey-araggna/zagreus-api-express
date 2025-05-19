import PortfolioService from '../services/PortfolioService.js';

class PortfolioController {

    static async getPaginatedPortfolios(req, res) {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const portfolios = await PortfolioService.getPaginatedPortfolios(page, limit);
            return res.status(200).json({
                success: true,
                data: portfolios.data,
                pagination: portfolios.pagination
            });
        } catch (error) {
            console.error('Error fetching paginated portfolios:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

export default PortfolioController;