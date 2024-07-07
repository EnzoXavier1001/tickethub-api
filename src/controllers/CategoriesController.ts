import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

class CategoriesController {
    async show(request: Request, response: Response) {
        try {
            const categories = await prisma.category.findMany()

            return response.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { name } = request.body

            const category = await prisma.category.create({
                data: {
                    name
                }
            })

            return response.status(201).json(category)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CategoriesController