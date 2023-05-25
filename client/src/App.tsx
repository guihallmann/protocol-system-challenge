import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PersonProtocols from "./pages/PersonProtocols";
import RegisterPerson from "./pages/RegisterPerson";
import RegisterProtocol from "./pages/RegisterProtocol";
import EditPerson from "./pages/EditPerson";
import EditProtocol from "./pages/EditProtocol";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/person/:id/protocols" element={<PersonProtocols />} />
      <Route path="/edit/protocol/:id" element={<EditProtocol />} />
      <Route path="/edit/person/:id" element={<EditPerson />} />
      <Route path="/register/person" element={<RegisterPerson />} />
      <Route path="/register/protocol" element={<RegisterProtocol />} />
    </Routes>
  );
}

export default App;
