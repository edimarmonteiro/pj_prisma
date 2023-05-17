import {Response , Request } from "express"
import { database } from "../database";


export class CreateUserController {
    async handle(request: Request, response: Response) {
        const {name, email } = request.body;

        //Criando o usuario
        const user = await database.user.create({
            data: {
                name,
                email
            }
        })

        response.json(user)
    }
}