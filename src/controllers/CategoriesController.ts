import { Request, Response } from "express";

const sql = require("../database/db")

class CategoriesController {
    async show(request: Request, response: Response) {
        try {
            const categories = await sql.default`SELECT * FROM category`

            return response.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { name } = request.body

            const category = await sql.default`INSERT INTO category (name) VALUES (${name})`

            return response.status(201).json(category)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CategoriesController