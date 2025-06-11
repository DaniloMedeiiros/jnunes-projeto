import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCursoDetalhes from '../../../hooks/useCursoDetalhes'; // Importa o hook

const CursoDetalhes = () => {
  const { id } = useParams();
  const [CursoComponent, setCursoComponent] = useState(null);

  const { curso, isLoading, error } = useCursoDetalhes(id);

  // Determina se deve usar dados mockados
  const USE_MOCKED_DATA = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Importação dinâmica ajustada para a estrutura de pastas
        const cursoMap = {
          1: () => import('./Curso1')
          // Adicione outros cursos conforme necessário
        };

        if (cursoMap[id]) {
          const module = await cursoMap[id]();
          setCursoComponent(() => module.default);
        }
      } catch (error) {
        console.error('Erro ao carregar o curso:', error);
      }
    };

    loadComponent();
  }, [id]);

  if (isLoading && !USE_MOCKED_DATA) return <div>Carregando curso...</div>;
  if (error && !USE_MOCKED_DATA)
    return <div>Erro ao carregar curso: {error.message}</div>;
  if (!CursoComponent) return <div>Curso indisponivel!</div>;

  return <CursoComponent cursoData={USE_MOCKED_DATA ? null : curso} />;
};

export default CursoDetalhes;
