import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Employees from "./views/Employees";
import Permissions from "./views/Permissions";
import Login from "./views/Login";
import Register from "./views/Register";
import Employee from "./views/Employee";
import AssignPermissions from "./views/AssignPermissions";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/:id" element={<Employee />} />
          <Route path="/assign/:id" element={<AssignPermissions />} />
          <Route path="/permissions" element={<Permissions />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
