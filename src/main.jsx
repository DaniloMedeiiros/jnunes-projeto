import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trilhas from './pages/Trilhas';
import CursoDetalhes from './pages/Trilhas/Cursos/cursodetalhes';
import InformacoesGerais from './pages/Trilhas/Cursos/Curso1/InformacoesGerais';
import ConteudoTrilha from './pages/Trilhas/Cursos/Curso1/ConteudoTrilha';
import PlayerAula from './pages/Trilhas/Cursos/Curso1/PlayerAula';
import Quiz from './pages/Trilhas/Cursos/Curso1/quiz';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/trilha/:id" element={<CursoDetalhes />} />
        <Route path="/curso1/informacoesgerais" element={<InformacoesGerais />} />
        <Route path="/curso1/conteudotrilha" element={<ConteudoTrilha />} />
        <Route path="/curso1/modulo1/aula1" element={<PlayerAula />} /> {/* Nova rota adicionada */}
        <Route path="/quiz" element={<Quiz />} /> {/* Nova rota do quiz */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);