import { Request, Response } from "express";

const sql = require("../database/db")

class ServicesController {
    async show(request: Request, response: Response) {
        try {
           const services = await sql.default`
              SELECT 
    services.subject, 
    services.description, 
    services.status, 
    category.name AS category_name, 
    customer.name AS customer_name, 
    levels.name AS levels_name,
    levels.color AS levels_color
FROM 
    services 
INNER JOIN 
    category ON services.category_id = category.id
INNER JOIN 
    levels ON services.priority_level_id = levels.id
INNER JOIN 
    customer ON services.customer_id = customer.id;
           `

           console.log(services)

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

        await sql.default`
        INSERT INTO services (user_id, subject, description, status, priority_level_id, category_id, customer_id)
        VALUES (${user}, ${subject}, ${description}, ${status}, ${priorityLevel}, ${category}, ${customer})
         `;

         const allServices = await sql.default`
         SELECT services.subject, services.description, services.status, category.name AS category_name, levels.name AS levels_name
          FROM services 
          INNER JOIN category ON services.category_id = category.id
          INNER JOIN levels ON services.priority_level_id = levels.id
        `
        
        return response.status(201).json(allServices)
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