import { Router } from "express"
import { CreateUserController, UpdateUserController } from "../controllers/CreateUserController";
import { NoteUserController } from "../controllers/NoteUserController";

const router = Router();

const createUser = new CreateUserController();
const updateUser = new UpdateUserController();
// const createNotes = new NoteUserController();

router.post('/user', createUser.handle);
router.put('/:id', updateUser.handle)
// router.post('/notes', createNotes.handle)
export { router };