import express from 'express';
import { addRegister, deleteRegister, detailRegister, listRegister, updateRegister } from '../controllers/registerController.js';

const registerRouter = express.Router();

registerRouter.post("/add", addRegister);
registerRouter.get("/list", listRegister);
registerRouter.post("/delete", deleteRegister);
registerRouter.post("/update", updateRegister);
registerRouter.get("/detail/:id", detailRegister);

export default registerRouter;