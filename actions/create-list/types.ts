import { z } from "zod";
import { CreateList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof CreateList>
export type ReturnType = ActionState<InputType , List>