import express from 'express';
import { register, login } from '../controllers/authController';

const authRoutes = express.Router();

// Rotas de autenticação
authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;
