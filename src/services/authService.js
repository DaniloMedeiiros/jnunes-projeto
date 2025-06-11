const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const authService = {
  login: async (loginInput, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula: loginInput, senha: password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token); // Armazena o token
      return data;
    } catch (error) {
      console.error('Erro no serviço de autenticação:', error);
      throw error;
    }
  },

  getAuthenticatedUser: async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Erro ao buscar dados do usuário autenticado.'
        );
      }

      const data = await response.json();
      return data.usuario; // Retorna apenas o objeto de usuário
    } catch (error) {
      console.error('Erro ao buscar usuário autenticado:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authService;
