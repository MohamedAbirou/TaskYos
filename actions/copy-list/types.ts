import { z } from "zod";
import { CopyList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType , List>