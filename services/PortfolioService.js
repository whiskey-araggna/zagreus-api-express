import Portfolio from '../models/Portfolio.js';

class PortfolioService {


    async getPaginatedPortfolios(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const portfolios = await Portfolio.getPaginated(limit, offset);

        if (portfolios.rows.length === 0) {
            return {
                data: [],
                pagination: {
                    current_page: page,
                    total_pages: 0
                }
            };
        }

        const totalItems = portfolios.rows[0].total_count;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: portfolios.rows,
            pagination: {
                current_page: page,
                total_pages: totalPages,
                items_per_page: limit,
                total_items: totalItems,
                has_next_page: page < totalPages,
                has_prev_page: page > 1
            }
        };
    }
}

export default new PortfolioService();