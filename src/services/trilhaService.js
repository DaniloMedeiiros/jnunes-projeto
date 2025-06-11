const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const trilhaService = {
  getTrilhas: async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/trilhas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao buscar trilhas');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no serviço de trilhas:', error);
      throw error;
    }
  }
};

export default trilhaService;
