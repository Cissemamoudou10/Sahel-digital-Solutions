import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./authContext/AuthProvider";
import { ErrorProvider } from "./errorContext/ErrorContext";
import ErrorModal from "./errorContext/ErrorModal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ErrorProvider>
        <ErrorModal/>
          {" "}
          <App />
      </ErrorProvider>
    </AuthProvider>
  </StrictMode>
);
