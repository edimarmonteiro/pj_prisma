import {Response , Request } from "express"
import { database } from "../database";
const { hash } = require("bcrypt")


export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        //Cripitografando senha
        const hashedPassword = await hash(password, 10)
        //Criando o usuario
        const user = await database.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        response.json(user)
    }

//     //Lidando com atualização de dados
//     async update(request: Request, response: Response) {
//         const { name, email, password, old_password } = request.body;
//         const { id } = request.params;

//         const database = await sqliteConnection();
//         const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

//         user.name = name ?? user.name;
//         user.email = email ?? user.email;
    

//     }
 }

