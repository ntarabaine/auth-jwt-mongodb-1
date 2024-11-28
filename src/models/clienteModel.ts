import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: {type:String, required:true},
  cpf: {type:String, required:true, unique:true},
  contato: {type:String, required:true}
})

const Cliente = mongoose.model('Cliente', clienteSchema)

export default Cliente