import { Router } from "express"
//import { CreateUserController, UpdateUserController } from "../controllers/CreateUserController";
import { NoteUserController } from "../controllers/NoteUserController";
import { userrouter } from "./user.routes";

const router = Router();

// const createUser = new CreateUserController();
// const updateUser = new UpdateUserController();
const createNotes = new NoteUserController();

router.post('/user', userrouter);
router.put('/user', userrouter)
router.post('/:userId', createNotes.handle)
export { router };