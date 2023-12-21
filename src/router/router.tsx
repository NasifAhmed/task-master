import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);
