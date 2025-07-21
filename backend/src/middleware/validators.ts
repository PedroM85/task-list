import { body } from 'express-validator';

/**
 * taskTitleValidator
 *
 * Middleware de validación para el campo 'title' en una tarea.
 * Se asegura de que el título:
 *  - Sea una cadena de texto (string)
 *  - Tenga una longitud mínima de 3 y máxima de 100 caracteres
 *
 * En caso de errores, los mensajes personalizados indicarán qué está mal.
 *
 * Uso:
 *   app.post('/api/task', taskTitleValidator, (req, res) => { ... });
 */
export const taskTitleValidator = [
  body('title')
    .isString().withMessage('El título debe ser texto')
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
];