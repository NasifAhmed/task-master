import developerPic from "/developer.svg";

export default function DeveloperBanner() {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-20">
            <div className="flex flex-col justify-center items-start">
                <h1 className="font-bold text-2xl md:text-5xl">
                    For Developers
                </h1>
                <p className="mt-5 mb-10 max-w-60 text-xl">
                    Manage task while developing exciting apps
                </p>
            </div>
            <div className="max-w-[250px] md:max-w-[450px]">
                <img src={developerPic} alt="" />
            </div>
        </div>
    );
}
