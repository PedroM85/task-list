import mongoose from 'mongoose';


/**
 * Esquema de Mongoose para las tareas (Tasks).
 * 
 * Este modelo representa una tarea individual dentro del sistema de gestión de tareas.
 * Cada tarea está asociada a un usuario (userId) y contiene un título y un estado de completado.
 * 
 * Campos:
 * - title: (string) Título descriptivo de la tarea. Obligatorio, entre 3 y 100 caracteres.
 * - completed: (boolean) Indica si la tarea fue completada. Por defecto es false.
 * - userId: (string) ID del usuario que creó la tarea. Obligatorio.
 * 
 * Validaciones:
 * - title debe tener mínimo 3 caracteres y máximo 100.
 * 
 * Ejemplo de uso:
 * ```ts
 * const task = new Task({ title: 'Aprender Cypress', userId: 'abc123' });
 * await task.save();
 * ```
 */

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [100, 'El título es demasiado largo (máximo 100 caracteres)'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
