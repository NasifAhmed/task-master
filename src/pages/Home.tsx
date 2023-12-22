import Banner from "@/components/Banner";
import DeveloperBanner from "@/components/DeveloperBanner";
import StudentBanner from "@/components/StudentBanner";

export default function Home() {
    return (
        <div className="md:space-y-40 space-y-20">
            <Banner />
            <DeveloperBanner />
            <StudentBanner />
        </div>
    );
}
