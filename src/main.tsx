import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.tsx";
import { router } from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </AuthProvider>
);
