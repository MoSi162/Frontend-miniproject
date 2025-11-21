import {  Artwork } from "../schemas/ArtworkSchema";

export async function fetchArtworks(query: string): Promise<Artwork[]> {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,date_display,medium_display,dimensions,image_id,short_description,credit_line&limit=12`;
  const response = await fetch(url);
  const json = await response.json();

  const artworks: Artwork[] = [];
  if (Array.isArray(json.data)) {
    for (const item of json.data) {
      const result = Artwork.safeParse(item);
      if (result.success) {
        artworks.push(result.data);
      }
    }
  }
  return artworks;
}
