import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="flex flex-col max-w-screen-2xl h-screen mx-auto">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
