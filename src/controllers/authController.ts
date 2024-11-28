import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/userModel";

const SECRET_KEY = process.env.SECRET_KEY as string

//Registrar novo usuario
export const register = async (req: Request, res: Response) => {
  const { nome, cpf, senha, permissao } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = new User({ nome, cpf, senha: hashedPassword, permissao });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário ou usuário já existente.' });
  }
};

//Login do usuario
export const login = async (req: Request, res: Response) => {
  const { cpf, senha } = req.body;
  try {
    const user = await User.findOne({ cpf });
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const token = jwt.sign({ id: user._id, cpf: user.cpf, permissao: user.permissao }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
