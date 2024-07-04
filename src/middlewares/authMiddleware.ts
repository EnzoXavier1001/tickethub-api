
const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express";

function userIsAuthenticated(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['x-access-token']
    jwt.verify(token, process.env.SECRET, (err: any, decoded: { userId: string; }) => {
        if(err) return response.status(401).json({error: 'Token inválido'})

        console.log(decoded)

        request.userId = decoded.userId
        next()
    })
}

module.exports = userIsAuthenticated