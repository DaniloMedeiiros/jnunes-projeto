import { useEffect, useState } from 'react';
import cursoService from '../services/cursoService';

const useCursoDetalhes = (cursoId) => {
  const [curso, setCurso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cursoId) {
      setIsLoading(false);
      return;
    }

    const fetchCurso = async () => {
      try {
        const cursoData = await cursoService.getCursoById(cursoId);
        setCurso(cursoData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurso();
  }, [cursoId]);

  return { curso, isLoading, error };
};

export default useCursoDetalhes;
