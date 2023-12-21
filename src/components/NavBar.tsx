import { Button } from "@/components/ui/button";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);

    const links = [
        {
            name: "Home",
            url: "/",
        },

        {
            name: "Task Dashboard",
            url: "/dashboard",
        },
    ];

    function logOutHandler() {
        logOut().then(() => {
            console.log("User logged out");
        });
    }

    return (
        <nav className="flex">
            <div className="navstart">
                <Logo />
            </div>
            <div className="navmid flex-grow">
                <ul className="flex justify-start items-center">
                    {links.map((link, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => navigate(link.url)}
                                className="p-5 cursor-pointer"
                            >
                                {link.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="navend flex justify-end items-center gap-5">
                {user && (
                    <div className="flex justify-center items-center gap-3">
                        <h3>{user?.email}</h3>
                        <Avatar>
                            <AvatarFallback>AB</AvatarFallback>
                            <AvatarImage src={user?.photoURL as string} />
                        </Avatar>
                    </div>
                )}
                {user ? (
                    <Button onClick={logOutHandler}>Log Out</Button>
                ) : (
                    <>
                        <Button onClick={() => navigate("/login")}>
                            Log In
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
