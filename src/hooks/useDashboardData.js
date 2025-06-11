import { useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService';
import trilhaService from '../services/trilhaService';
import userService from '../services/userService';

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
        const progressos = await dashboardService.getDashboardProgressos();
        const topAprendizes =
          await dashboardService.getDashboardTopAprendizes();
        const estatisticas = await dashboardService.getDashboardEstatisticas();

        setDashboardData({
          user,
          trilhas,
          progressos,
          topAprendizes,
          estatisticas
        });
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
