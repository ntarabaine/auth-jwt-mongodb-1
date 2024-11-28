import express from 'express';
import { listar, adicionar, editar, deletar, listarTiposQuarto } from '../controllers/quartoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const quartoRoutes = express.Router();

// Listar todos os quartos (qualquer usuário pode acessar)
quartoRoutes.get('/', authMiddleware, listar);

// Adicionar um novo quarto (somente admin pode fazer isso)
quartoRoutes.post('/', authMiddleware, roleMiddleware(['admin']), adicionar);

// Editar um quarto (somente admin pode fazer isso)
quartoRoutes.put('/quartos/:id', authMiddleware, roleMiddleware(['admin']), editar);

// Deletar um quarto (somente admin pode fazer isso)
quartoRoutes.delete('/quartos/:id', authMiddleware, roleMiddleware(['admin']), deletar);

// Listar todos os tipos de quarto (qualquer usuário pode acessar)
quartoRoutes.get('/tipos-quartos', authMiddleware, listarTiposQuarto);

export default quartoRoutes;
