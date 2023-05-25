import { Request, Response } from "express";
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

export class NoteUserController {
  async handle(request: AuthenticatedRequest, response: Response) {
    const { title, description, tags, links } = request.body as NoteData;
    const userId = request.user.id;

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





























































// import { Request, Response } from "express";
// import { database } from "../database";


// interface notes {
//     title: string;
//     description: string;
//     links: string;
// }
// export class NoteUserController {
//     async handle(request: Request, response: Response) {
//         const { title, description, links } = request.body as notes;

//         const note = await database.note.create({
//             data: {
//                 title,
//                 description,
//                 user: {
//                     connect: {
//                         id: 5
//                     }
//                 }
//             }
//         })        

//     }
// }



