import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
