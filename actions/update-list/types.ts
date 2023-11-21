import { z } from "zod";
import { UpdateList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType , List>