import {pool} from "../config/db.js";

class Portfolio {

    async getPaginated(limit, offset) {

        const query = `
            SELECT 
                zagid as id,
                zagporttitle as title,
                zagportdesc as description,
                zagportcolor as color,
                zagportimage as image,
                zagportlink as demo_link,
                zagporttech as tech,
                COUNT(*) OVER() AS total_count
            FROM zagportfolio 
            ORDER BY zagid 
            LIMIT $1 OFFSET $2
        `;

        return pool.query(query, [limit, offset]);

    }



}

export default new Portfolio();