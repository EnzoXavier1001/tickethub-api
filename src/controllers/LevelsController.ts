import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class LevelsController {
    async show(request: Request, response: Response) {
        try {
            const levels = await prisma.levels.findMany({
                select: {
                    name: true,
                    id: true,
                    color: true
                }
            })

            return response.status(200).json(levels)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao exibir o nível de prioridade'})
        }
    }
}

module.exports = LevelsController