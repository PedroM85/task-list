import { Request, Response, NextFunction } from 'express';
import admin from '../firebaseAdmin';

/**
 * verifyToken
 *
 * Middleware que verifica el token JWT de Firebase enviado en la cabecera 'Authorization'.
 * Si el token es válido, lo decodifica y lo agrega a `req.user`.
 * Si es inválido o expirado, responde con el error correspondiente.
 *
 * Uso típico:
 *   app.get('/api/protected', verifyToken, (req, res) => { ... });
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Token requerido',
      error: 'auth/no-token'
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (err: any) {
    console.error('Error verificando token:', err?.errorInfo?.code || err.message);

    const firebaseError = err?.errorInfo?.code || 'auth/invalid-token';

    if (firebaseError === 'auth/id-token-expired') {
      return res.status(401).json({
        message: 'Token expirado',
        error: 'auth/id-token-expired'
      });
    }

    return res.status(403).json({
      message: 'Token inválido',
      error: firebaseError
    });
  }
};
