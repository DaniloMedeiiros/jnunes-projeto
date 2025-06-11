import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [user, setUser] = useState(null); // Pode ser usado para armazenar dados do usuário logado

  useEffect(() => {
    // Verifica o token ao carregar a aplicação
    if (authService.isAuthenticated()) {
      // Aqui você pode adicionar uma chamada para /auth/me para obter os dados do usuário
      // e definir setUser(userData);
    }
  }, []);

  const login = async (loginInput, password) => {
    try {
      const data = await authService.login(loginInput, password);
      setIsAuthenticated(true);
      // Opcional: buscar dados do usuário após o login bem-sucedido
      // const userData = await authService.getUserData(); // Exemplo de função a ser criada
      // setUser(userData);
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
