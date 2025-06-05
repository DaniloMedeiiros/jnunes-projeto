import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trilhas from './pages/Trilhas';
import CursoDetalhes from './pages/Trilhas/Cursos/cursodetalhes';
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);