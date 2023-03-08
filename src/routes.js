import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Main from "./views/Main";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default MainRoutes;
