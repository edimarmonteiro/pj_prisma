import { Router } from "express"
import { CreateUserController, UpdateUserController } from "../controllers/CreateUserController";

const userrouter = Router();

const createUser = new CreateUserController();
const updateUser = new UpdateUserController();


userrouter.post('/:id', createUser.handle);
userrouter.put('/', updateUser.handle);

export { userrouter };