import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
require('dotenv').config()

class Users {
    async create(request: Request, response: Response) {
        try {
            const { email, name, password } = request.body
            const emailExists = await prisma.users.findUnique({
                where: {
                    email
                }
            })

            if(emailExists) {
                return response.status(500).json({ error: 'E-mail já existe no sistema'})
            }

            const hashedPassword = await bcrypt.hash(password, 8)

            const user = await prisma.users.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            })

            return response.status(201).json(user)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao cadastrar o usuário'}).end()
        }
    }

    async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body
            const userExists = await prisma.users.findUnique({
               where: {
                email
               }
            })

            if(!userExists) {
                return response.status(500).json({ error: 'E-mail não existe'})
            }

            const userAuthenticationMatch = await bcrypt.compare(password, userExists.password);

            if(userAuthenticationMatch) {
               const token = jwt.sign({userId: userExists.id}, process.env.SECRET, { expiresIn: 300 })
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