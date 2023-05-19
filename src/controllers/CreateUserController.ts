import {Response , Request } from "express"
import { database } from "../database";
const { hash, compare } = require("bcrypt")


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

 }

 export class UpdateUserController {
    async handle(request: Request, response: Response) {
      const { id } = request.params;
      const { name, email, password, currentPassword } = request.body;
  
      try {
        // Verificar se o usuário existe
        const existingUser = await database.user.findUnique({
          where: { id: parseInt(id) }, // Converter 'id' para número
        });
        
        if (!existingUser) {
          return response.status(404).json({ error: "Usuário não encontrado." });
        }
  
      // Verificar a senha atual do usuário
      const isPasswordValid = await compare(currentPassword, existingUser.password);
      
      if (!isPasswordValid) {
        return response.status(401).json({ error: "Senha atual inválida." });
      }
        // Atualizar dados do usuário
        const updatedUser = await database.user.update({
          where: { id: parseInt(id) }, // Converter 'id' para número
          data: {
            name: name || existingUser.name,
            email: email || existingUser.email,
            password: password
              ? await hash(password, 10)
              : existingUser.password,
          },
        });
  
        response.json(updatedUser);
      } catch (error) {
        response.status(500).json({ error: "Erro ao atualizar usuário." });
      }
    }
  }