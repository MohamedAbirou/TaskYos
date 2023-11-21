import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const headingFont = localFont({
    src: "../public/fonts/font.woff2"
})

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden md:flex items-center hover:opacity-75 transition gap-x-2">
                <Image src="/images/logo.png" alt="Logo" height={30} width={30} />
                <p className={cn(
                    "text-lg text-neutral-700 pt-0.5",
                    headingFont.className
                )}>TaskYos</p>
            </div>
        </Link>
    )
}