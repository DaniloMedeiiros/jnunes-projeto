import authService from './authService';

const userService = {
  // Função para buscar dados do usuário autenticado
  getUserProfile: async () => {
    try {
      const userData = await authService.getAuthenticatedUser();
      return userData;
    } catch (error) {
      console.error('Erro no serviço de usuário ao buscar perfil:', error);
      throw error;
    }
  }
};

export default userService;
