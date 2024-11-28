import mongoose, { Schema } from "mongoose";

const ReservaSchema = new mongoose.Schema({
  quarto_id: {type:mongoose.Schema.Types.ObjectId, ref:'Quarto', required: true},
  cliente_id: {type:mongoose.Schema.Types.ObjectId, ref:'Cliente', required:true},
  check_in: {type:Date, required:true},
  check_out:{type:Date, required:false},
  gastosAdicionais: {type:Number, default:0},
  valorTotal: {type:Number}
})

const Reserva = mongoose.model('Reserva', ReservaSchema)

export default Reserva

