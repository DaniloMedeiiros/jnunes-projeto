import { useEffect, useState } from 'react';
import trilhaService from '../services/trilhaService';
import userService from '../services/userService';
// Importe outros serviços conforme necessário para o dashboard

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Exemplo de busca de dados:
        const user = await userService.getUserProfile();
        const trilhas = await trilhaService.getTrilhas();
        // Adicione outras chamadas de serviço aqui

        setDashboardData({ user, trilhas /*, outros dados */ });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, isLoading, error };
};

export default useDashboardData;
