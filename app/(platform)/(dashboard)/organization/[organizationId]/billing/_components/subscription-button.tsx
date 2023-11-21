"use client"

import { stripeRedirect } from "@/actions/stripe-redirect"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface SubscriptionButtonProps {
    isPro: boolean
}

export const SubscriptionButton = ({
    isPro
} : SubscriptionButtonProps) => {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onClick = () => {
        if (isPro) {
            execute({})
        } else {
            proModal.onOpen()
        }
    }

    return (
        <Button onClick={onClick} variant="primary" disabled={isLoading}>
            {isPro ? "Manage subscription" : "Upgrade to pro"}
            {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
    )
}
