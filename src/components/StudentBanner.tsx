import studentPic from "/student.svg";

export default function StudentBanner() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            <div className="max-w-[250px] md:max-w-[450px]">
                <img src={studentPic} alt="" />
            </div>
            <div className="flex flex-col justify-center items-start">
                <h1 className="font-bold text-2xl md:text-5xl">For Students</h1>
                <p className="mt-5 mb-10 max-w-60 text-xl">
                    Manage tasks during busy exam week or organize your study
                    plan
                </p>
            </div>
        </div>
    );
}
