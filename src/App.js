import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    /*<BrowserRouter>
      <nav>
        <h1>Home chido</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Page2</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>*/
  );
}

export default App;
