import React, { useState } from "react";

interface Props {
  onSearch: (type: "id" | "title" | "artist", query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<"id" | "title" | "artist">("title");
  const [query, setQuery] = useState<string>("");

  return (
    <form
      className="flex items-center gap-4 mb-6"
      onSubmit={e => {
        e.preventDefault();
        if (query.trim() !== "") onSearch(searchType, query.trim());
      }}>
      <select
        className="select select-warning bg-darkblue text-gold border-gold"
        value={searchType}
        onChange={e => setSearchType(e.target.value as "id" | "title" | "artist")}
      >
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="artist">Artist Name</option>
      </select>
      <input
        className="input input-warning bg-darkblue text-gold border-gold placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
        type="text"
        placeholder={`Search for ${searchType}…`}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="btn btn-warning font-serif" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
