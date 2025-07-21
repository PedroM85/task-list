// Importación de librerías necesarias
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Importación de rutas
import taskroutes from './route';

// Carga variables de entorno desde .env
dotenv.config();

// Inicializa la app Express
const app = express();
app.use(cors());               // Permite peticiones desde otros dominios
app.use(express.json());       // Permite recibir JSON en los requests

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión', err));

// Ruta base de prueba
app.get('/', (_, res) => res.send('API funcionando 🚀'));


// Registro de rutas específicas (ej. /api/tasks)
app.use(taskroutes);

// Arranque del servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en puerto', process.env.PORT || 3000);
});
