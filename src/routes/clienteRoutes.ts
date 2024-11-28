import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { adicionar,listar, editar, deletar } from "../controllers/clienteController";

const clienteRoutes = express.Router()

clienteRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  adicionar
)

clienteRoutes.get(
  "/",  
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  listar
)

clienteRoutes.put(
  "/clientes/:id",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  editar
)

clienteRoutes.delete(
  "/clientes/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deletar
)

export default clienteRoutes