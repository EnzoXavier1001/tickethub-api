import { Request, Response } from "express";
const bcrypt = require("bcrypt")

const sql = require("../database/db")

class Users {
    async create(request: Request, response: Response) {
        try {
            const { email, name, password } = request.body
            const emailExist = await sql.default`SELECT * FROM users WHERE email = ${email}`

            if(emailExist.length > 0) {
                return response.status(500).json({ error: 'E-mail já existe no sistema'})
            }

            const hashedPassword = await bcrypt.hash(password, 8)
    
            const user = await sql.default`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword})`

            return response.status(201).json(user)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao cadastrar o usuário'})
        }
    }
}

module.exports = Users