import { useEffect, useRef } from "react"

import arrow_down from "./../assets/arrow-down.svg"

import '../styles/sorter.css'

type sorterProps = {
  sort: string,
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sorter({ sort, setSort }: sorterProps) {

  const sortRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const details = sortRef.current;
      if (details && details.open && !details.contains(event.target as Node)) {
        details.open = false;
      };
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <details ref={sortRef}>
        <summary className="sort-summary">
          <p>{sort === "created_at" ? "New Products First" :
            sort === "-price" ? "Price, high to low" :
              sort === "price" ? "Price, low to high" : "Sort by"}</p>
          <div className="icon-wrapper-small">
            <img className="arrow-down" src={arrow_down} alt="arrow down" />
          </div>
        </summary>
        <div className="sort-dropdown dropdown-menu">
          <div className="sort-dropdown-container dropdown-container">
            <p>Sort by</p>
            <ul>
              <li onClick={() => { setSort("created_at") }}> <span> New Products First </span></li>
              <li onClick={() => { setSort("-price") }}> <span> Price, high to low</span></li>
              <li onClick={() => { setSort("price") }}> <span> Price, low to high</span></li>
            </ul>
          </div>
        </div>
      </details>
    </>
  );
}