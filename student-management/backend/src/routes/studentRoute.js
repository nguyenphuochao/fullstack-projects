import express from 'express';
import { addStudent, listStudent, deleteStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post("/add", addStudent);
studentRouter.get("/list", listStudent);
studentRouter.post("/delete", deleteStudent);

export default studentRouter;