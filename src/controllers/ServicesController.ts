import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
const prisma = new PrismaClient()

class ServicesController {
    async show(request: Request, response: Response) {
        try {
            const services = await prisma.services.findMany({
                select: {
                    subject: true,
                    description: true,
                    status: true,
                    customer: {
                       select: {
                            name: true
                       }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    },
                    level: {
                        select: {
                            color: true,
                            name: true
                        }
                    }
                }
            })

           return response.status(200).json(services)   
        } catch (error) {
             return response.status(500).json({ error: 'Erro ao buscar serviços' });
        }
    }

    async create(request: Request, response: Response) {
       try {
        const { user, subject, description, status, priorityLevel, category, customer} = request.body

        if(!subject) {
            return response.status(500).json({ error: 'Erro ao criar serviço. Colocar assunto' });
        }

        const services = await prisma.services.create({
            data: {
                subject,
                description,
                status,
                user_id: user,
                category_id: category,
                priority_level_id: priorityLevel,
                customer_id: customer
            }
        })

        return response.status(201).json(services)
       } catch (error) {
        return response.status(500).json({ error: 'Erro ao criar serviço' });
       }
    }

    async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
    
            const services = await prisma.services.update({
                data: request.body,
                where: {
                    id: Number(id)
                }
            });
    
            return response.status(200).json(services);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ error: 'Erro ao atualizar o serviço' });
        }
    }
}

module.exports = ServicesController