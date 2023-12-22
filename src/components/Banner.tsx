import { AuthContext } from "@/provider/AuthProvider";
import { ArrowRightCircle } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import bannerPic from "/banner.svg";

export default function Banner() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            <div className="max-w-[250px] md:max-w-[450px]">
                <img src={bannerPic} alt="" />
            </div>
            <div className="flex flex-col justify-center items-start">
                <h1 className="font-bold text-3xl md:text-6xl">Task Master</h1>
                <p className="mt-5 mb-10 max-w-60 text-2xl">
                    Webiste to manage your tasks
                </p>
                <Button
                    variant={"default"}
                    onClick={() => {
                        if (user) {
                            navigate("/dashboard");
                        } else {
                            navigate("/login");
                        }
                    }}
                >
                    Explore <ArrowRightCircle className="ml-3" />
                </Button>
            </div>
        </div>
    );
}
