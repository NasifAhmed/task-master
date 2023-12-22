import { Facebook, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="flex flex-col bg-muted mt-20">
            <div className="mt-10 py-20 flex items-center justify-around ">
                <div className="leftside flex flex-col justify-center items-center">
                    <Logo />
                    <h2 className="font-semibold text-lg mt-3">Task Master</h2>
                </div>
                <div className="rightside flex gap-5 justify-center items-center">
                    <a href="http://www.facebook.com">
                        <Facebook />
                    </a>
                    <a href="http://www.x.com">
                        <Twitter />
                    </a>
                    <a href="http://www.youtube.com">
                        <Youtube />
                    </a>
                </div>
            </div>
            <div className="mb-5 px-4 text-center text-slate-500">
                <small className="mb-2 text-xs block">
                    &copy; 2023 Nasif Ahmed. All rights reserved.
                </small>

                <p className="text-xs">
                    <span className="font-bold">About this website: </span>{" "}
                    built with React + Typescript, Tailwind CSS{" "}
                </p>
            </div>
        </footer>
    );
}
