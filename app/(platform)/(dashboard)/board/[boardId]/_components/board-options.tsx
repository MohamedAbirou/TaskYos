"use client"

import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { Loader2, MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

interface BoardOptionsProps {
    id: string
}

export const BoardOptions = ({
    id
} : BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = () => {
        execute({ id })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button variant="destructive" onClick={onDelete} disabled={isLoading} className="flex items-center justify-center rounded-sm w-[90%] h-auto mx-auto p-2 px-5 font-normal text-sm">
                    Delete this board
                    {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" /> }
                </Button>
            </PopoverContent>
        </Popover>
    )
}