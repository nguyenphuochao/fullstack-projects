import express from 'express';
import { loginAuth, registerAuth, logoutAuth } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/register", registerAuth);
authRouter.post("/login", loginAuth);
authRouter.post("/logout", logoutAuth);

export default authRouter;