"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCard, Crown } from "lucide-react"
import Image from "next/image"

interface InfoProps {
    isPro: boolean
}

export const Info = ({
    isPro
} : InfoProps) => {
    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return (
            <Info.Skeleton />
        )
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image fill src={organization?.imageUrl!} alt="Organization" className="rounded-md object-cover" />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {organization?.name}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    {isPro ? (
                        <div className="flex bg-amber-500/40 px-2 py-1 rounded-sm text-amber-700">
                            <p className="font-semibold">PRO</p>
                            <Crown className="w-4 h-4 ml-1" />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <CreditCard className="w-3 h-3 mr-1" />
                            <p>Free</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </div>
    )
}