import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>
);
