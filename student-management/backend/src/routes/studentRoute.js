import express from 'express';
import { addStudent, listStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post("/add", addStudent);
studentRouter.get("/list", listStudent);

export default studentRouter;