import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Searchbar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  let debounceTimer = useRef(null);

  const fetchResults = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://project-validator.onrender.com/api/v1/q/?search=${searchTerm}`
      );
      setResults(data.projects || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchResults(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-5" ref={searchRef}>
      <form
        className="mx-4"
        onSubmit={(e) => {
          e.preventDefault();
          fetchResults(query);
        }}
      >
        <input
          type="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search"
          value={query}
          onChange={handleSearchChange}
        />
      </form>

      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10">
          {loading ? (
            <p className="p-2 text-gray-500 text-sm">Loading...</p>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100 flex justify-around"
                onClick={() => {
                  onSelect(item);
                  setQuery(item.name);
                }}
              >
                <span>{item.author_name}</span> |{" "}
                <span>{item.project_title}</span> |{" "}
                <span>{item.date_of_submission}</span> |{" "}
                <span>{item.supervisor}</span>
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500 text-sm">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
