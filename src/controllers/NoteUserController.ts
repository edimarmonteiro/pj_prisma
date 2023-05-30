

//import { Request, Response, Application } from "express";
import { Request } from "express";
import { Response, Application } from "express";


import { database } from "../database";

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

interface NoteData {
  title: string;
  description: string;
  tags: string[];
  links: string[];
}

//async handle(request: Request, response: Response<Application>): Promise<void>
//async handle(request: AuthenticatedRequest, response: Response<Application>): Promise<void>

export class NoteUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { title, description, tags, links } = request.body as NoteData;
    const userId = (request as AuthenticatedRequest).user.id;
  
    try {
      const note = await database.note.create({
        data: {
          title,
          description,
          user: {
            connect: {
              id: userId
            }
          },
          tags: {
            create: tags.map(tag => ({
              nameTitle: tag
            }))
          },
          link: {
            create: links.map(link => ({
              url: link
            }))
          }
        },
        include: {
          tags: true,
          link: true
        }
      });
  
      response.json(note);
    } catch (error) {
      response.status(500).json({ error: "Erro ao criar a nota." });
    }
  }
}
