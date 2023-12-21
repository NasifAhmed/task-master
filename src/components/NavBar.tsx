import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
    const navigate = useNavigate();

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

    return (
        <nav className="flex">
            <div className="navstart">
                <Logo />
            </div>
            <div className="navmid flex-grow">
                <ul className="flex justify-start items-center">
                    {links.map((link) => {
                        return (
                            <li
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
                <div className="flex justify-center items-center gap-3">
                    <h3>name@email.com</h3>
                    <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                        <AvatarImage src="" />{" "}
                    </Avatar>
                </div>
                <Button>Log In</Button>
                <Button>Register</Button>
            </div>
        </nav>
    );
}
