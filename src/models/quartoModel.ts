import mongoose, { Schema } from "mongoose";


const quartoSchema = new mongoose.Schema({
  numero: {type:String, required: true, unique: true},
  tipo: {type:Schema.Types.ObjectId, ref:'TipoQuarto', required:true},
  status:{
    type:String,
    enum:['disponivel', 'reservado', 'ocupado', 'interditado'],
    default: 'disponivel',
  }
})

const Quarto = mongoose.model('Quarto', quartoSchema)

export default Quarto
