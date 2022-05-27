import { Router } from "express";
import { login } from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/login', login);

export default authRoutes;