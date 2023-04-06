import { BrowserRouter, Routes, Route } from "react-router-dom"

//done
import Home from "./pages/Home";
import Login from "./pages/Login"
import Registro from "./pages/Registro_med"
import Logs from "./pages/Logs"
//not done
import Reportes from "./pages/Reportes"
import RegistroPaciente from "./pages/Registro_paciente"
import IngresoPaciente from "./pages/Ingreso_paciente"
import Inventario from "./pages/Inventario"
import ActualizacionDatos from "./pages/Actualizacion_datos"


function App() {
  return (
    //Rutas de la aplicación
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/registro_paciente" element={<RegistroPaciente />} />
        <Route path="/ingreso_paciente" element={<IngresoPaciente />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/act_datos" element={<ActualizacionDatos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
