import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../../public/fonts/font.woff2"
})

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
})

const MarketingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className={cn(
                "flex flex-col items-center justify-center",
                headingFont.className
            )}>
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-indigo-100 text-indigo-700 rounded-full uppercase">
                    <Medal className="h-6 w-6 mr-2" />
                    No 1 task management tool
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-neutral-800 mb-6">
                    <span className="text-indigo-700 font-bold border-b-4 border-dotted border-indigo-700">TaskYos</span> helps team improve
                </h1>
                <div className="text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md py-2 w-fit">
                    work forward.
                </div>
            </div>
            <div className={cn(
                "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
                textFont.className
            )}>
                Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with TaskYos
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sign-up">
                    Get TaskYos for free
                </Link>
            </Button>
        </div>
    )
}
 
export default MarketingPage;