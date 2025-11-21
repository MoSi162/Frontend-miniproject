import { z } from "zod";

export const NoteSchema = z.string().max(200).default("");
export type Note = z.infer<typeof NoteSchema>;
