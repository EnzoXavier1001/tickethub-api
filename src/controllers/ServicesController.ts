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
       const { customer, subject, description, status } = request.body

       try {
        const services = await sql.default`
        INSERT INTO services (subject, description, status)
        VALUES (${subject}, ${description}, ${status})
         `;
 
        return response.status(201).json(services)
       } catch (error) {
        return response.status(500).json({ error: 'Erro ao criar serviço' });
       }
      
    }
}

module.exports = ServicesController