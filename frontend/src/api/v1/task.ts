import axios from '../../utils/axios';


export const getTasks = async () => {
    try {
        console.log("Obtener tareas");
        const response = await axios.get('/api/tasks');
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error Obtener  task:', error);
        throw error;
    }
};

export const createTask = async (task: { title: string }) => {
    try {
        console.log("Datos de la tarea", {title: task.title});
        const response = await axios.post('/api/tasks', { title : task.title });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error saving task:', error);
        throw error;
    }
};


export const deleteTask = async (id: string) => {
    try {
        console.log("Datos de la tarea a eliminar", id);
        const response = await axios.delete(`/api/tasks/${id}`);
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error saving task:', error);
        throw error;
    }
};

export const updateTask = async (id: string, updatedData: { title: string }) => {
    try {
        console.log("Actualizando tarea", id, updatedData);
        const response = await axios.put(`/api/tasks/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando tarea:', error);
        throw error;
    }
};

export const markTaskAsDone  = async (id: string, completed: boolean) => {
    try {
        console.log("Cambiando estado de tarea", id, completed);
        const response = await axios.patch(`/api/tasks/${id}`, { completed });
        return response.data;
    } catch (error) {
        console.error('Error cambiando estado de tarea:', error);
        throw error;
    }
};