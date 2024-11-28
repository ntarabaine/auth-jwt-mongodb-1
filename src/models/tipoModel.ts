import mongoose, { Schema } from "mongoose"

const tipoQuartoSchema = new mongoose.Schema({
  nome: {type:String, required:true, unique:true},
  capacidade: {type:Number, required:true},
  descricao:{type:String},
  precoBase:{type:Number, required:true}
})

const TipoQuarto = mongoose.model('TipoQuarto', tipoQuartoSchema)

export default TipoQuarto