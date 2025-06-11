const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const avaliacaoService = {
  submitAvaliacao: async (avaliacaoData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/avaliacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(avaliacaoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar avaliação');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no serviço de avaliação:', error);
      throw error;
    }
  }
};

export default avaliacaoService;
