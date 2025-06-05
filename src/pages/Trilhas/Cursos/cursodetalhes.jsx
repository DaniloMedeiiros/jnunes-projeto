import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const CursoDetalhes = () => {
  const { id } = useParams();
  const [CursoComponent, setCursoComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Importação dinâmica ajustada para a estrutura de pastas
        const cursoMap = {
          1: () => import('./Curso1'),
          // Adicione outros cursos conforme necessário
        };

        if (cursoMap[id]) {
          const module = await cursoMap[id]();
          setCursoComponent(() => module.default);
        }
      } catch (error) {
        console.error("Erro ao carregar o curso:", error);
      }
    };

    loadComponent();
  }, [id]);

  if (!CursoComponent) return <div>Curso indisponivel!</div>;

  return <CursoComponent />;
};

export default CursoDetalhes;