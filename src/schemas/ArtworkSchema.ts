import { z } from "zod";

export const Artwork = z.object({
  id: z.number(),
  title: z.string().default("Unknown Title"),
  artist_title: z.string().default("Unknown Artist"),
  date_display: z.string().nullable().optional(),
  medium_display: z.string().nullable().optional(),
  dimensions: z.string().nullable().optional(),
  image_id: z.string().optional(),
  short_description: z.string().nullable().optional(),  
  credit_line: z.string().nullable().optional(),      
});

export type Artwork = z.infer<typeof Artwork>;
