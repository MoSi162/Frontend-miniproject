import React, { useState } from "react";
import { Artwork } from "../schemas/ArtworkSchema";
import { NoteSchema } from "../schemas/noteSchema";
import { setNote, getNote } from "../utils/storage";

interface Props {
  artwork: Artwork;
  onAddToGallery?: (artwork: Artwork) => void;
  allowNote?: boolean;
}

const ArtworkCard: React.FC<Props> = ({ artwork, onAddToGallery, allowNote }) => {
  const [note, setNoteState] = useState<string>(getNote(artwork.id));
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : "https://via.placeholder.com/200?text=No+Image";

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const result = NoteSchema.safeParse(value);
    if (result.success) {
      setNote(artwork.id, value);
      setNoteState(value);
    }
  };

  return (
   <div className="card">
  <img src={imageUrl} alt={artwork.title} className="art-img" />
  <h3>{artwork.title}</h3>
  <p><i>{artwork.artist_title}</i></p>
  <p><b>Date:</b> {artwork.date_display || "N/A"}</p>
  <p><b>Medium:</b> {artwork.medium_display || "N/A"}</p>
  <p><b>Dimensions:</b> {artwork.dimensions || "N/A"}</p>
  <p><b>Description:</b> {artwork.short_description ?? "No description available."}</p>
  <p><b>Credit Line:</b> {artwork.credit_line ?? "N/A"}</p>
  {onAddToGallery && (
    <button onClick={() => onAddToGallery(artwork)}>Add to Gallery</button>
  )}
  {allowNote && (
    <div className="note-area">
      <label>Note:</label>
      <textarea value={note} onChange={handleNoteChange} maxLength={200} rows={2} />
    </div>
  )}
</div>
  );
};

export default ArtworkCard;