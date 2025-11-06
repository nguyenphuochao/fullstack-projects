import express from 'express';
import { addRegister, listRegister } from '../controllers/registerController.js';

const registerRouter = express.Router();

registerRouter.post("/add", addRegister);
registerRouter.get("/list", listRegister);

export default registerRouter;