import { z } from "zod";
import { UpdateCard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCard>
export type ReturnType = ActionState<InputType , Card>