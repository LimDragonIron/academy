import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export interface DashBoardLayoutProps {
    children: React.ReactNode;
}

const DashBoardLayout = ({children}:DashBoardLayoutProps) => {
    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                Left
            </div>
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}

export default DashBoardLayout;