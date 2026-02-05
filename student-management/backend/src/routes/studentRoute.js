import express from 'express';
import { addStudent, listStudents, detailStudent, deleteStudent, updateStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post("/add", addStudent);
studentRouter.get("/list", listStudents);
studentRouter.get("/detail/:id", detailStudent);
studentRouter.post("/delete", deleteStudent);
studentRouter.post("/update", updateStudent);

export default studentRouter;