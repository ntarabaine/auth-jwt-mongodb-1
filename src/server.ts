import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import quartoRoutes from './routes/quartoRoutes';
import clienteRoutes from './routes/clienteRoutes';
import reservaRoutes from './routes/reservaRoutes';

dotenv.config();
const app = express();
app.use(express.json());
// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});
// Rotas
app.use('/user', userRoutes);
app.use('/quartos', quartoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservas', reservaRoutes)

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost>:${PORT}`);
});