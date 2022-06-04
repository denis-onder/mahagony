import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Employees from "./views/Employees";
import Permissions from "./views/Permissions";
import Login from "./views/Login";
import Register from "./views/Register";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/permissions" element={<Permissions />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
