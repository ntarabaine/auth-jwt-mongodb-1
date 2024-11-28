import express from "express";
import { adicionar, editar, registrarCheckIn, registrarCheckOut } from "../controllers/reservaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const reservaRoutes = express.Router();

// Rota para adicionar uma nova reserva
reservaRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  adicionar
);

// Rota para editar uma reserva existente
reservaRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  editar
);

// Rota para registrar o check-in
reservaRoutes.put(
  "/:id/check-in",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  registrarCheckIn
);

// Rota para registrar o check-out
reservaRoutes.put(
  "/:id/check-out",
  authMiddleware,
  roleMiddleware(["admin", "funcionario"]),
  registrarCheckOut
);

export default reservaRoutes;
