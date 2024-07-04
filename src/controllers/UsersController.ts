import { Request, Response } from "express";
const bcrypt = require("bcrypt")

const sql = require("../database/db")
const jwt = require("jsonwebtoken")
require('dotenv').config()

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
            return response.status(500).json({ error: 'Erro ao cadastrar o usuário'}).end()
        }
    }

    async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body
            const userExist = await sql.default`SELECT * FROM users WHERE email = ${email}`

            if(!userExist) {
                return response.status(500).json({ error: 'E-mail não existe'})
            }

            const userAuthenticationMatch = await bcrypt.compare(password, userExist[0].password);

            if(userAuthenticationMatch) {
               const token = jwt.sign({userId: userExist[0].id}, process.env.SECRET, { expiresIn: 300 })
               return response.status(200).json({ auth: true, token})
            } else {
                return response.status(401).json({ error: 'Senha inválida'})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Users