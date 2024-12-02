import axiosClient from "../api/axiosClient";

// Define la interfaz para una tarea
interface Task {
  id?: string; // Opcional porque al crear no tendrá ID todavía
  title: string;
  description: string;
  userId: string; // Relación con el usuario
}

// Obtener tareas
export const getTasks = async (userId: string): Promise<{ tasks: Task[] }> => {
  const response = await axiosClient.get(`/tasks?userId=${userId}`);
  
  return response.data;
};

// Crear tarea
export const createTask = async (task: Task): Promise<{ message: string; task: Task }> => {
  const response = await axiosClient.post("/tasks", task);
  return response.data;
};

// Actualizar tarea
export const updateTask = async (
  taskId: string,
  task: Partial<Task> // Partial porque solo necesitas enviar los campos que deseas actualizar
): Promise<{ message: string; task: Task }> => {
  const response = await axiosClient.put(`/tasks/${taskId}`, task);
  return response.data;
};

// Eliminar tarea
export const deleteTask = async (taskId: string): Promise<{ message: string }> => {
  const response = await axiosClient.delete(`/tasks/${taskId}`);
  return response.data;
};
