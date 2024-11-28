import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload | string;

    // Verifica se 'user' é um objeto e possui o campo 'permissao'
    if (typeof user !== 'string' && user.permissao && roles.includes(user.permissao)) {
      return next(); // Permissão válida, continua para o próximo middleware
    }

    // Permissão inválida, retorna erro
    return res.status(403).json({ error: 'Acesso negado' });
  };
};
