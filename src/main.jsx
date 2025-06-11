import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Importa o ProtectedRoute
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Trilhas from './pages/Trilhas';
import CursoDetalhes from './pages/Trilhas/Cursos/cursodetalhes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trilhas"
            element={
              <ProtectedRoute>
                <Trilhas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trilha/:id"
            element={
              <ProtectedRoute>
                <CursoDetalhes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
