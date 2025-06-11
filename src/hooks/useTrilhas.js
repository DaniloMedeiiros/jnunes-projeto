import { useEffect, useState } from 'react';
import trilhaService from '../services/trilhaService';

const useTrilhas = () => {
  const [trilhas, setTrilhas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrilhas = async () => {
      try {
        const trilhasData = await trilhaService.getTrilhas();
        setTrilhas(trilhasData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  return { trilhas, isLoading, error };
};

export default useTrilhas;
