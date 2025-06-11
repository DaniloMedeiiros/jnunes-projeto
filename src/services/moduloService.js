const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const moduloService = {
  getModulosByTrilha: async (trilhaId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${API_BASE_URL}/trilhas/${trilhaId}/modulos`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Erro ao buscar módulos da trilha'
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no serviço de módulos:', error);
      throw error;
    }
  }
};

export default moduloService;
