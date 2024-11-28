import { Response, Request } from "express"
import Cliente from "../models/clienteModel";

export const adicionar = async (req:Request, res:Response) => {
  const {nome, cpf, contato} = req.body;

  try {
    const clienteExistente = await Cliente.findOne({cpf})

    if(clienteExistente){
      return res.status(404).json({error:"Cliente já cadastrado com este CPF"})
    }

    const novo = new Cliente({nome, cpf, contato});
    await novo.save()

    res.status(201).json({message:"Cliente adicionado com sucesso", cliente: novo})
  } catch (error) {
    res.status(500).json({error:"Erro ao adicionar cliente"})
  }
}

export const listar = async (req:Request, res:Response) => {
  try {
    const clientes = await Cliente.find()
    res.json(clientes)
  } catch (error) {
    res.status(500).json({error: "Erro ao listar os clientes"})
  }
}

export const editar = async (req:Request, res:Response) => {  
  const cliente_id = req.params.id
  const {nome, contato} = req.body

  try {
    const cliente = await Cliente.findByIdAndUpdate(
      cliente_id,
      {nome, contato},
      {new:true}
    )

    if(!cliente){
      return res.status(404).json({error:"Cliente não encontrado"})
    }

    res.json({message: "Cliente atualizado com sucesso", cliente: cliente})
  } catch (error) {
    res.status(500).json({error:"Erro ao atualizar o cliente"})
  }
}

export const deletar = async (req:Request, res:Response) => {
  const cliente_id = req.params.id

  try {
    const cliente = await Cliente.findByIdAndDelete(cliente_id)
    if(!cliente){
      return res.status(404).json({error:'Cliente não encontrado'})
    }

    res.json({message:'Cliente deletado com sucesso'})
  } catch (error) {
    res.status(500).json({error:'Erro ao deletar o quarto'})
  }
}

