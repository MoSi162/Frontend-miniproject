import React from "react";
import { Artwork } from "../schemas/ArtworkSchema";
import { removeFromGallery, removeNote } from "../utils/storage";
import ArtworkCard from "./ArtworkCard";

interface Props {
  gallery: Artwork[];
  onRemove: (id: number) => void;
}

const Gallery: React.FC<Props> = ({ gallery, onRemove }) => (
  <div>
    <h2 className="text-2xl font-serif text-gold mt-10 mb-4">My Gallery</h2>
    <div className="flex flex-wrap">
      {gallery.length === 0 && <p className="text-gold">Not interested in Paintings yet? </p>}
      {gallery.map(artwork => (
        <div key={artwork.id} className="relative">
          <ArtworkCard artwork={artwork} allowNote/>
          <button
            className="btn btn-error btn-xs absolute top-4 right-6"
            onClick={() => {
              removeFromGallery(artwork.id);
              removeNote(artwork.id);
              onRemove(artwork.id);
            }}
          >   
            Remove from Gallery
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Gallery;
