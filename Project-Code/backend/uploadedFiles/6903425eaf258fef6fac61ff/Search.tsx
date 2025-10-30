/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";

export interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [error, setError] = useState<string>("");

  const validate = (value: string): string => {
    const nameParam = value.trim();
    if (!nameParam) return "Please enter a Pokedex name.";
    if (/\d/.test(nameParam)) return "Numbers are not allowed in the search.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError(validate(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = validate(query);
    if (msg) {
      setError(msg);
      return;
    }
    onSearch(query.trim());
  };

  const isDisabled = !!error || query.trim().length === 0;
  return (
    <section id="searchDiv">
      <label htmlFor="search" style={{display: "inline-block"}}>Search</label>
      <form onSubmit={handleSubmit} noValidate style={{display: "inline-block"}}>
        <input
          type="text" name="search" id="search" placeholder="Search Pokedex by name..."
          value={query}
          onChange={handleChange}
          style={{display: "inline-block"}}
        />
        <button type="submit" disabled={isDisabled}>Search</button>
        {error && (
          <p id="search-error" role="alert" style={{ color: "red", marginTop: 8 }}>
            {error}
          </p>
        )}
      </form>
    </section>
  );
};

export default Search;