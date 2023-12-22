import Logo from "./Logo";

export default function Footer() {
    return (
        <div className="mt-10 py-20 flex items-center justify-around bg-muted">
            <div className="leftside flex flex-col justify-center items-center">
                <Logo />
            </div>
            <div className="rightside flex flex-col justify-center items-center">
                right
            </div>
        </div>
    );
}
