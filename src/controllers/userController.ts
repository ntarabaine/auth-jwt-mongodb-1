import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

// adicionar novo funcionário (admin)
export const adicionar = async (req: Request, res: Response) => {
  const { nome, cpf, senha, permissao } = req.body;

  try {
    // Verificar se o CPF já está cadastrado
    const userExistente = await User.findOne({ cpf });
    if (userExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado com este CPF' });
    }

    // Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar novo usuário (funcionário ou admin)
    const novoUsuario = new User({
      nome,
      cpf,
      senha: senhaHash,
      permissao: permissao || 'funcionario', // Padrão é funcionário
    });

    await novoUsuario.save();

    return res.status(201).json({ message: 'Funcionário adicionado com sucesso', usuario: novoUsuario });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao adicionar funcionário' });
  }
};

// login de usuário (admin ou funcionário)
export const login = async (req: Request, res: Response) => {
  const { cpf, senha } = req.body;

  try {
    // Buscar o usuário pelo CPF
    const user = await User.findOne({ cpf });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user._id, cpf: user.cpf, permissao: user.permissao },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login' });
  }
};

// listar todos os usuários (admin)
export const listar = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os usuários' });
  }
};

// deletar usuário (admin)
export const deletar = async (req: Request, res: Response) => {
  const usuarioId = req.params.id;

  try {
    const usuarioDeletado = await User.findByIdAndDelete(usuarioId);
    if (!usuarioDeletado) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
};
