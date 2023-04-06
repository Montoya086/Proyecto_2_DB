import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login"
import Registro from "./pages/Registro_med"
import Logs from "./pages/Logs"


function App() {
  return (
    //Rutas de la aplicación
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
