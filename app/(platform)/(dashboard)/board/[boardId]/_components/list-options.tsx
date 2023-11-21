"use client"

import { copyList } from "@/actions/copy-list"
import { deleteList } from "@/actions/delete-list"
import { FormSubmit } from "@/components/form/form-button"
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { MoreHorizontal, X } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

interface ListOptionsProps {
    data: List
    onAddCard: () => void
}

export const ListOptions = ({
    data,
    onAddCard
} : ListOptionsProps) => {
    const [title, setTitle] = useState(data.title)
    const closeRef = useRef<ElementRef<"button">>(null)
    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" deleted`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List "${title}" copied`)
            setTitle(data.title)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button onClick={onAddCard} className="rounded-sm w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-indigo-500/30 hover:text-indigo-700 transition" variant="ghost">
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit className="rounded-sm w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-indigo-500/30 hover:text-indigo-700 transition" variant="ghost">
                        Copy list...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit className="rounded-sm mt-2 w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-rose-500/30 hover:text-rose-700 transition" variant="ghost">
                        Delete this list...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}