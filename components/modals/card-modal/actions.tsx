"use client"

import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { useCardModal } from "@/hooks/use-card-modal"
import { CardWithList } from "@/types"
import { Copy, Loader2, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface ActionsProps {
    data: CardWithList
}

export const Actions = ({
    data
} : ActionsProps) => {
    const params = useParams()
    const cardModal = useCardModal()
    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" copied`)
            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`)
            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onCopy = () => {
        const boardId = params.boardId as string

        executeCopyCard({ 
            id: data.id,
            boardId 
        })
    }

    const onDelete = () => {
        const boardId = params.boardId as string

        executeDeleteCard({ 
            id: data.id,
            boardId 
        })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button onClick={onCopy} disabled={isLoadingCopy} variant="primary" className="w-full justify-start" size="inline">
                <Copy  className="w-4 h-4 mr-2"/>
                Copy
                {isLoadingCopy && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
            </Button>
            <Button onClick={onDelete} disabled={isLoadingDelete} variant="destructive" className="w-full justify-start" size="inline">
                <Trash  className="w-4 h-4 mr-2"/>
                Delete
                {isLoadingDelete && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}