import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { verifyToken } from '../middleware/verifyToken';
import { taskTitleValidator } from '../middleware/validators';
import Task from '../models/Task';

const router = Router();


/**
 * @route GET /api/tasks
 * @description Obtiene todas las tareas asociadas al usuario autenticado.
 * @access Privado (requiere token de Firebase válido)
 *
 * Este endpoint devuelve la lista de tareas que pertenecen al usuario autenticado,
 * utilizando su UID proporcionado por el token de Firebase.
 *
 * Requiere autenticación mediante el middleware `verifyToken`, el cual valida el
 * token JWT enviado en el encabezado Authorization.
 *
 * Ejemplo de encabezado:
 * Authorization: Bearer <token>
 *
 * Respuestas:
 * - 200: Retorna un array de tareas del usuario.
 * - 401: Token ausente o inválido (no autorizado).
 * - 500: Error interno del servidor al intentar recuperar las tareas.
 */
router.get('/api/tasks', verifyToken, async (req, res) => {
  const uid = (req as any).user.uid;
  try {
    const tasks = await Task.find({ userId: uid });
    res.json(tasks);
  } catch (err) {
    
    res.status(500).json({ message: 'Error interno' });
  }
});

/**
 * @route POST /api/tasks
 * @description Crea una nueva tarea para el usuario autenticado.
 * @access Privado (requiere token de Firebase válido)
 *
 * Este endpoint permite crear una tarea con un título asociado al usuario autenticado.
 *
 * Requiere:
 * - Autenticación mediante middleware `verifyToken`.
 * - Validación del campo `title` con el middleware `taskTitleValidator`.
 *
 * Body esperado (JSON):
 * {
 *   "title": "Nombre de la tarea"
 * }
 *
 * Validaciones:
 * - `title` debe ser una cadena de texto entre 3 y 100 caracteres.
 *
 * Respuestas:
 * - 201: Tarea creada correctamente. Devuelve el objeto de la tarea.
 * - 400: Fallo en la validación. Devuelve un array con los errores.
 * - 401: Token ausente o inválido (no autorizado).
 * - 500: Error interno al intentar guardar la tarea.
 */
router.post('/api/tasks', verifyToken, taskTitleValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const uid = (req as any).user.uid;
  const { title } = req.body;
  

  try {
    const task = await Task.create({ title, userId: uid });
    res.status(201).json(task);
  } catch (err) {
    
    res.status(500).json({ message: 'Error al guardar' });
  }
});


/**
 * @route DELETE /api/tasks/:id
 * @description Elimina una tarea por ID.
 * @access Privado (requiere token de Firebase válido)
 *
 * Este endpoint permite eliminar una tarea específica perteneciente al usuario autenticado.
 *
 * Parámetros de ruta:
 * - `id`: ID de la tarea a eliminar.
 *
 * Requiere:
 * - Autenticación mediante middleware `verifyToken`.
 *
 * Respuestas:
 * - 200: Tarea eliminada correctamente. Devuelve mensaje de confirmación.
 * - 404: Tarea no encontrada. El ID proporcionado no corresponde a ninguna tarea.
 * - 401: Token ausente o inválido (no autorizado).
 * - 500: Error interno al intentar eliminar la tarea.
 */
router.delete('/api/tasks/:id', verifyToken,  async (req: Request, res: Response) => {
  
  const { id } = req.params;
  
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    
    res.status(500).json({ message: 'Error al eliminar' });
  }
});


/**
 * @route PUT /api/tasks/:id
 * @description Actualiza el título de una tarea existente.
 * @access Privado (requiere token de Firebase válido)
 *
 * Este endpoint permite modificar el título de una tarea específica que pertenezca al usuario autenticado.
 *
 * Parámetros de ruta:
 * - `id`: ID de la tarea a actualizar.
 *
 * Body requerido:
 * - `title`: Nuevo título de la tarea. (string no vacío, validado por `taskTitleValidator`)
 *
 * Requiere:
 * - Autenticación mediante middleware `verifyToken`.
 * - Validación del título mediante `taskTitleValidator`.
 *
 * Respuestas:
 * - 200: Actualización exitosa. Devuelve `{ success: true }`.
 * - 400: Validación fallida (título inválido).
 * - 401: Token ausente o inválido.
 * - 500: Error interno al intentar actualizar.
 */
router.put('/api/tasks/:id', verifyToken, taskTitleValidator, async (req:Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { title } = req.body;
  try {
    await Task.findByIdAndUpdate(id, { title });
    res.send({ success: true });
  } catch (err) {
    
    res.status(500).json({
    
  });
  }
});


/**
 * @route PATCH /api/tasks/:id
 * @description Cambia el estado de completado (`completed`) de una tarea específica.
 * @access Privado (requiere token de Firebase válido)
 *
 * Este endpoint permite marcar una tarea como completada o incompleta.
 *
 * Parámetros de ruta:
 * - `id`: ID de la tarea a actualizar.
 *
 * Body requerido:
 * - `completed`: Valor booleano (`true` o `false`) que indica el nuevo estado de la tarea.
 *
 * Requiere:
 * - Autenticación mediante middleware `verifyToken`.
 *
 * Respuestas:
 * - 200: Actualización exitosa. Devuelve `{ success: true }`.
 * - 401: Token ausente o inválido.
 * - 500: Error interno al cambiar el estado.
 */
router.patch('/api/tasks/:id', verifyToken,  async (req:Request, res:Response) => {
    
  
  const { completed } = req.body;
  const uid = (req as any).user.uid;
  const { id } = req.params;
  try {
    
    await Task.findByIdAndUpdate(id, { completed: completed });
    res.send({ success: true });
  } catch (err) {
    
    res.status(500).send({ success: false, message: 'Error al cambiar estado' });
  }
});

export default router;