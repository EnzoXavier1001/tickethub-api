import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class CustomersController {
    async show(request: Request, response: Response) {
        try {
            const customers = await prisma.customer.findMany()

            return response.status(200).json(customers)
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um erro ao listar os clientes'})
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { name, address, cnpj } = request.body

            const customerExists = await prisma.customer.findUnique({
                where: {
                    cnpj
                }
            })

            if(customerExists) {
                return response.status(500).json({ error: 'Já existe um cliente cadastrado com este CNPJ'})
            }

            const customer = await prisma.customer.create({
                data: {
                    name,
                    address,
                    cnpj
                }
            })     
            return response.status(201).json(customer)   
        } catch (error) { 
            return response.status(500).json({ error: 'Erro ao cadastrar o cliente'})
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { name, address } = request.body
            const { id } = request.params
            const customer = await prisma.customer.update({
                data: {
                    name,
                    address
                },
                where: {
                    id: Number(id)
                }
            })

            return response.status(200).json(customer)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao atualizar os dados do cliente'})
        }
    }
}

module.exports = CustomersController