import { Request, Response } from "express";

const sql = require("../database/db")

class ServicesController {
    async show(request: Request, response: Response) {
        try {
           const services = await sql.default`
            select * from services
           `

           return response.status(200).json(services)   
        } catch (error) {
             return response.status(500).json({ error: 'Erro ao buscar serviços' });
        }
    }

    async create(request: Request, response: Response) {
       try {
        const { customer, subject, description, status } = request.body

        if(!subject) {
            return response.status(500).json({ error: 'Erro ao criar serviço.' });
        }

        const services = await sql.default`
        INSERT INTO services (user_id, subject, description, status)
        VALUES (${customer}, ${subject}, ${description}, ${status})
         `;
 
        return response.status(201).json(services)
       } catch (error) {
        return response.status(500).json({ error: 'Erro ao criar serviço' });
       }
    }

    async update(request: Request, response: Response) {
        try {
            const { subject, description, status } = request.body
            const { id } = request.params
            
            const services = await sql.default`
               UPDATE services
               SET subject = ${subject}, description = ${description}, status = ${status}
               WHERE id = ${id}
            `

            return response.status(200).json(services)
        } catch (error) {
            
        }
    }
}

module.exports = ServicesController