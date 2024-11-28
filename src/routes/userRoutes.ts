import express from 'express';
import {
  adicionar,
  login,
  listar,
  deletar
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const userRoutes = express.Router();

// Rota para listar todos os usuários (somente admin)
userRoutes.get('/', authMiddleware, roleMiddleware(['admin']), listar);

// Rota para deletar um usuário (somente admin)
userRoutes.delete('/delete/:id', authMiddleware, roleMiddleware(['admin']), deletar);
// Rota para adicionar um funcionário (Admin)
userRoutes.post('/register', authMiddleware, roleMiddleware(['admin']), adicionar);
// Rota de login para qualquer usuário (Admin ou Funcionário)
userRoutes.post('/login', login);


export default userRoutes;
