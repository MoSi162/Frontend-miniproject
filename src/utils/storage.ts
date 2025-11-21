import { Artwork } from "../schemas/ArtworkSchema";


export function getGallery(): Artwork[] {
  const stored = localStorage.getItem("gallery");
  return stored ? JSON.parse(stored) : [];
}
export function addToGallery(artwork: Artwork): void {
  const gallery = getGallery();
  gallery.push(artwork);
  localStorage.setItem("gallery", JSON.stringify(gallery));
}
export function removeFromGallery(id: number): void {
  const gallery = getGallery().filter((a) => a.id !== id);
  localStorage.setItem("gallery", JSON.stringify(gallery));
}


export function getNote(id: number): string {
  return localStorage.getItem(`note-${id}`) || "";
}
export function setNote(id: number, note: string): void {
  localStorage.setItem(`note-${id}`, note);
}
export function removeNote(id: number): void {
  localStorage.removeItem(`note-${id}`);
}
