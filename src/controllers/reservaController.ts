import {Request, Response} from "express"
import Reserva from "../models/reservaModel";
import Quarto from "../models/quartoModel";


export const adicionar = async(req:Request, res:Response) => {
  const { quarto_id, cliente, check_in, check_out, gastosAdicionais, valorTotal } = req.body;

  try {
    const quarto = await Quarto.findById(quarto_id)

    if(!quarto){
      return res.status(400).json({error:"Quarto não encontrado"})
    }

    if(quarto.status != "disponivel"){
      return res.status(400).json({error: "O quarto não está disponivel para reserva"})
    }

    const reserva = new Reserva({
      quarto_id,
      cliente, 
      check_in,
      check_out,
      gastosAdicionais,
      valorTotal
    })

    await reserva.save()
    
    quarto.status = 'reservado'
    await quarto.save()

    res.status(201).json({message:"Reserva adicionada com sucesso", reserva: reserva})
 
  } catch (error) {
    res.status(500).json({error:"Não foi possivel registrar reserva"})
  }
}

// Registrar Check-in (admin e funcionário)
export const registrarCheckIn = async (req: Request, res: Response) => {
  const reservaId = req.params.id;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    // Verificar se o quarto está reservado
    const quarto = await Quarto.findById(reserva.quarto_id);

    if (!quarto) {
      return res.status(404).json({ error: "Quarto não encontrado" });
    }

    if (quarto.status !== 'reservado') {
      return res.status(400).json({ error: "O quarto não está reservado para check-in" });
    }

    // Alterar o status do quarto para 'ocupado'
    quarto.status = 'ocupado';
    await quarto.save();

    // Atualizar o check-in na reserva
    reserva.check_in = new Date();
    await reserva.save();

    res.json({ message: "Check-in realizado com sucesso", reserva });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar check-in" });
  }
};

// Registrar Check-out (admin e funcionário)
export const registrarCheckOut = async (req: Request, res: Response) => {
  const reservaId = req.params.id;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    // Verificar se o quarto está ocupado
    const quarto = await Quarto.findById(reserva.quarto_id);

    if (!quarto) {
      return res.status(404).json({ error: "Quarto não encontrado" });
    }

    if (quarto.status !== 'ocupado') {
      return res.status(400).json({ error: "O quarto não está ocupado" });
    }

    // Alterar o status do quarto para 'disponivel'
    quarto.status = 'disponivel';
    await quarto.save();

    // Atualizar o check-out na reserva
    reserva.check_out = new Date();
    await reserva.save();

    res.json({ message: "Check-out realizado com sucesso", reserva });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar check-out" });
  }
};

// Editar uma reserva (admin e funcionário)
export const editar = async (req: Request, res: Response) => {
  const reservaId = req.params.id;
  const { check_in, check_out, gastosAdicionais, valorTotal } = req.body;

  try {
    const reservaEditada = await Reserva.findByIdAndUpdate(
      reservaId,
      { check_in, check_out, gastosAdicionais, valorTotal },
      { new: true }
    );

    if (!reservaEditada) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    res.json({ message: "Reserva atualizada com sucesso", reserva: reservaEditada });
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar reserva" });
  }
};
