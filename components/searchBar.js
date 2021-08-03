import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { search } from "../lib/tmdbAPI";

const SEARCH_RES_SIZE = 5;

export default function SearchBar() {
  const searchRef = useRef(null);
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = useCallback(async (event) => {
    const query = event.target.value;

    if (query.length) {
      const response = await search(query);
      const results = response.results.slice(0, SEARCH_RES_SIZE);
      setResults(results);
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  });

  return (
    <div className="w-full px-3 lg:px-12 text-lg" ref={searchRef}>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 w-full rounded-sm bg-gray-100 outline-none focus:ring-2 ring-indigo-500"
        onChange={onChange}
        onFocus={onFocus}
      />
      <div className="relative">
        {active && results.length > 0 && (
          <ul className="absolute z-10 opacity-95 w-full bg-white">
            {results.map(({ id, title }) => (
              <li key={id} className="border-b-2 p-2">
                <Link href={`${id}`}>
                  <a>
                    <div className="">{title}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
