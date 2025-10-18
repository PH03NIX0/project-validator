// src/components/Searchbar.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../services/supabaseClient";

const Searchbar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  // Function to fetch search results from Supabase
  const fetchResults = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      setIsOpen(true);

      // Search in multiple columns using ilike (case-insensitive)
      const { data, error } = await supabase
        .from('Projects')
        .select('*')
        .or(
          `author_name.ilike.%${searchTerm}%,project_title.ilike.%${searchTerm}%,supervisor.ilike.%${searchTerm}%`
        )
        .limit(10);

      if (error) throw error;

      setResults(data || []);

      if (!data || data.length === 0) {
        setIsOpen(false);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const sanitizedQuery = query ? query.trim() : "";
    if (!sanitizedQuery) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [query, fetchResults]);

  // Close dropdown on outside click
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
          placeholder="Search by author, title, or supervisor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <p className="p-2 text-gray-500 text-sm">Searching...</p>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className="p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-0"
                onClick={() => {
                  onSelect(item);
                  setQuery(`${item.author_name} – ${item.project_title}`);
                  setIsOpen(false);
                }}
              >
                <div className="font-medium">{item.project_title}</div>
                <div className="text-sm text-gray-600">
                  {item.author_name} • {item.supervisor} •{" "}
                  {new Date(item.date_of_submission).toLocaleDateString()}
                </div>
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