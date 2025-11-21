import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ArtworkCard from "./components/ArtworkCard";
import Gallery from "./components/Gallery";
import { Artwork } from "./schemas/ArtworkSchema";
import { fetchArtworks } from "./utils/api";
import { getGallery, addToGallery } from "./utils/storage";

function App() {
  const [results, setResults] = useState<Artwork[]>([]);
  const [gallery, setGallery] = useState<Artwork[]>(getGallery());
  const [loading, setLoading] = useState(false);

  
  function handleHome() {
    setResults([]);
  }

  async function handleSearch(type: "id" | "title" | "artist", query: string) {
    setLoading(true);
    let found: Artwork[] = [];

    if (type === "id" && /^\d+$/.test(query.trim())) {
      const url = `https://api.artic.edu/api/v1/artworks/${query}?fields=id,title,artist_title,date_display,medium_display,dimensions,image_id,price`;
      const response = await fetch(url);
      const json = await response.json();
      found = json.data ? [json.data] : [];
    } else {
      found = await fetchArtworks(query.trim());
    }

    setResults(found);
    setLoading(false);
  }

  function handleAddToGallery(artwork: Artwork) {
    addToGallery(artwork);
    setGallery(getGallery());
  }
  
  function handleRemoveFromGallery() {
    setGallery(getGallery());
  }

  return (
    <div className="app-wrapper">
      <div className="header">
        Art Institute Explorer
        <button
          style={{ marginLeft: "1rem", padding: "0.3rem 1rem", cursor: "pointer" }}
          onClick={handleHome}
          title="Go Home"
        >
          Home
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {!loading && results.length === 0 && (
        <div style={{ color: '#888', margin: '2rem 0', textAlign: 'center' }}>
          Explore art here
        </div>
      )}
      {loading && <div style={{ textAlign: 'center' }}>Loading…</div>}
      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <div className="gallery-row">
            {results.map(artwork => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onAddToGallery={handleAddToGallery}
              />
            ))}
          </div>
        </div>
      )}
      <Gallery gallery={gallery} onRemove={handleRemoveFromGallery} />
    </div>
  );
}

export default App;
