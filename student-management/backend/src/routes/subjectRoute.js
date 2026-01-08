import express from 'express';
import { addSubject, listSubject } from '../controllers/subjectController.js';

const subjectRouter = express.Router();

subjectRouter.get("/list", listSubject);
subjectRouter.post("/add", addSubject);

export default subjectRouter;