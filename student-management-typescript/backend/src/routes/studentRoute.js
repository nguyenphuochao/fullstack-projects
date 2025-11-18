import express from 'express';
import { addStudent, listStudent, detailStudent, deleteStudent, updateStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post("/add", addStudent);
studentRouter.get("/list", listStudent);
studentRouter.get("/detail/:id", detailStudent);
studentRouter.post("/delete", deleteStudent);
studentRouter.post("/update", updateStudent);

export default studentRouter;