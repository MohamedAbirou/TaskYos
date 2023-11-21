import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ListContainer } from "./_components/list-container"

interface boardIdPageProps {
    params: {
        boardId: string
    }
}

const boardIdPage = async ({
    params
} : boardIdPageProps) => {
    const { orgId } = auth()

    if (!orgId) {
        redirect('/select-org')
    }

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId
            }
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })

    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer boardId={params.boardId} data={lists} />
        </div>
    )
}

export default boardIdPage