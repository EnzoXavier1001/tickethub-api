import { Request, Response } from "express";

const sql = require("../database/db")

class CustomersController {
    async show(request: Request, response: Response) {
        try {
            const customers = await sql.default`SELECT * FROM customer`

            return response.status(200).json(customers)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao listar os clientes'})
        }
    }
}

module.exports = CustomersController