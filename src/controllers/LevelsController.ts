import { Request, Response } from "express";

const sql = require("../database/db")

class LevelsController {
    async show(request: Request, response: Response) {
        try {
            const categories = await sql.default`SELECT id, name, color FROM levels`

            return response.status(200).json(categories)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao exibir o nível de prioridade'})
        }
    }
}

module.exports = LevelsController