import e, { Request, Response } from 'express';
import Quarto from "../models/quartoModel"
import TipoQuarto from '../models/tipoModel';

export const listar = async (req:Request, res:Response) =>{
  try{
    const quartos = await Quarto.find()
    res.status(200).json(quartos)
  }catch (error){
    res.status(500).json({error:"Erro ao listar os quartos"});
  }
}

export const adicionar = async (req:Request, res:Response) => {
  const {numero, tipo, status} = req.body
  try {
    //verificar se o tipo de quarto existe
    const tipoQuarto = await TipoQuarto.findById(tipo);
    if(!tipoQuarto){
      return res.status(404).json({error:'Tipo de quarto não encontrado'})
    } 

    //cria novo quarto
    const quarto = new Quarto({
      numero,
      tipo:tipoQuarto._id,
      status
    })

    await quarto.save();
    res.status(201).json({ message: 'Quarto criado com sucesso', quarto: quarto });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar o quarto' });
  }
}

export const editar = async (req:Request, res: Response) => {
  const {numero, tipo, status} = req.body
  const quarto_id = req.params.id

  try{
    //verificar se o tipo existe 
    const tipoQuarto = await TipoQuarto.findById(tipo);
    if(!tipoQuarto){
      return res.status(404).json({error:'Tipo de quarto não encontrado'})
    } 

    const quarto = await Quarto.findByIdAndUpdate(quarto_id,
      {numero,tipo:tipoQuarto._id, status},
      {new:true}
    )
    if (!quarto) {
      return res.status(404).json({ error: 'Quarto não encontrado' });
    }

    res.json({ message: 'Quarto atualizado com sucesso', quarto: quarto });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o quarto' });
  }
}

export const deletar = async(req:Request, res:Response) => {
  const quarto_id = req.params.id

  try {
    const quarto = await Quarto.findByIdAndDelete(quarto_id)
    if(!quarto){
      return res.status(404).json({error:'Quarto não encontrado!'})
    }

    res.json({message:'Quarto deletado com sucesso!'})
  } catch (error) {
    res.status(500).json({error:'Erro ao deletar o quarto'})
  }
}

export const listarTiposQuarto = async (req: Request, res: Response) => {
  try {
    const tiposQuarto = await TipoQuarto.find();

    if (!tiposQuarto || tiposQuarto.length === 0) {
      return res.status(404).json({ error: 'Nenhum tipo de quarto encontrado' });
    }

    res.json(tiposQuarto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os tipos de quarto' });
  }
};