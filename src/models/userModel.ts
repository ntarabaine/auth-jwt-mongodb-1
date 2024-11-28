import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  permissao:{
    type: String,
    enum: ["admin", "funcionario"], 
    default: "funcionario", 
  }
});

const User = mongoose.model('User', userSchema);

export default User;