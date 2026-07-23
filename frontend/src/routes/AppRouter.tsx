import { Routes, Route, Navigate} from "react-router-dom";
import { Login } from "../pages/login";
import { GestionGenero } from "../pages/GestionGenero.pages";
import { ProtectedRoute } from "../components/ProtectedRoute";


export default function AppRouter(){

return (



<Routes>
      
        <Route 
          path="/" 
          element={<Navigate to="/generos" replace />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/generos" 
          element={
            <ProtectedRoute>
              <GestionGenero />
            </ProtectedRoute>
          } 
        />

      


</Routes>


)

}