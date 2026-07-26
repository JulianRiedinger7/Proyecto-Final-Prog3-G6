import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login";
import { GestionGenero } from "../pages/GestionGenero.pages";
import { Biblioteca } from "../pages/Biblioteca";
import { AnadirLibro } from "../pages/AnadirLibro";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MainLayout } from "../components/layout/MainLayout";
import { Register } from "../pages/register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/generos" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/registros" element={<Register />} />

      <Route
        path="/generos"
        element={
          <ProtectedRoute>
            <MainLayout>
              <GestionGenero />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/biblioteca"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Biblioteca />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/anadir"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AnadirLibro />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}