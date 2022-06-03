import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
