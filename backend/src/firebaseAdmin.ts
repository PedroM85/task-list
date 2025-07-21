import * as admin from 'firebase-admin';
import * as fs from 'fs';


// 1. Lee el archivo con las credenciales del servicio
const serviceAccount = JSON.parse(
  fs.readFileSync('tasklistbase.json', 'utf8')
);

// 2. Inicializa Firebase Admin con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 3. Exporta la instancia de admin para usar en otras partes del proyecto
export default admin;