import { BrowserRouter, Routes, Route } from "react-router-dom"

//done
import Home from "./pages/Home";
import Login from "./pages/Login"
import Registro from "./pages/Registro_med"
//not done
import Logs from "./pages/Logs"
import Reportes from "./pages/Reportes"
import Registro_paciente from "./pages/Registro_paciente"
import Ingreso_paciente from "./pages/Ingreso_paciente"
import Inventario from "./pages/Inventario"
import Actualizacion_datos from "./pages/Actualizacion_datos"


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
        <Route path="/registro_paciente" element={<Registro_paciente />} />
        <Route path="/ingreso_paciente" element={<Ingreso_paciente />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/act_datos" element={<Actualizacion_datos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
