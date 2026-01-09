import apiClient from './apiClient';

export const taskService = {
    fetchTasks: async (start, end) => {
        const response = await apiClient.get('/tasks', {
            params: {
                start: start.toISOString(),
                end: end.toISOString()
            }
        });
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    },

    updateTask: async (id, updates) => {
        const response = await apiClient.put(`/tasks/${id}`, updates);
        return response.data;
    },

        deleteTask: async (taskId) => {
            // Sends DELETE request to: http://localhost:5000/api/tasks/:id
            return await apiClient.delete(`/tasks/${taskId}`);
        }
};