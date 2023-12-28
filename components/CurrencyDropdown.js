import React, { useState, useRef, useEffect } from "react";
import {theme} from "/components/Navbar"
const CurrencyDropdown = ({
  data,
  symbols,
  from,
  selectedCurrency,
  setSelectedCurrency,
  
  
}) => {
  const [toggle, setToogle] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  function handleSelection(val) {
    setSelectedCurrency(val);
    setToogle(false);
  }

  function handleToggle() {
    setToogle((prev) => !prev);
  }
  useEffect(() => {
    if (toggle && searchRef.current) {
      searchRef.current.focus();
    }
  }, [toggle, searchRef]);

  React.useEffect(() => {
    document.addEventListener("click", (event) => {
      if (
        !buttonRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        event.stopPropagation();
        setToogle(false);
      }
    });
  }, []);
  return (
    <div className="relative w-full text-left">
      <div >
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex w-full items-center justify-between rounded-md border gap-2 border-gray-300 dark:border-slate-500 dark:bg-[#3d3d3d] bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2">
            <div
              className={`currency-flag currency-flag-${selectedCurrency.toLowerCase()}`}
            ></div>
            <p className="flex flex-col items-start">
              <span className="font-semibold dark:text-white">{selectedCurrency}</span>{" "}
              <span className="text-slate-400 text-left text-xs ">
                {selectedCurrency}
              </span>
            </p>
          </div>
          {theme==="dark" ? <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg> :
          <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="black"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>}
        </button>
      </div>

      <div
        className={`absolute left-0 z-10 mt-2 w-full ${
          !toggle && "hidden"
        } rounded-md bg-white dark:bg-[#3d3d3d]  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        ref={dropdownRef}
      >
        <div className="py-1 px-1 " role="none">
          <div className="pt-2 relative mx-auto text-gray-600 dark:text-white">
            <input
              ref={searchRef}
              className="searchBar border-2 border-gray-300 bg-white dark:bg-[#3d3d3d] w-full h-10 px-5  rounded-lg text-sm focus:outline-none "
              type="text"
              name="search"
              placeholder="Search"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
          </div>
          <div className="overflow-y-scroll h-96  scrollbar-thumb-indigo-500  scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin ">
            {Object.keys(data)
              .filter((curr) =>
                curr.toLowerCase().includes(currentValue.toLowerCase())
              )
              .map((curr) => (
                <>
                  <button
                    className="text-gray-700 items-center px-4 py-2 text-sm flex gap-5"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => handleSelection(curr)}
                    key={curr + `-${from ? "from" : "to"}`}
                  >
                    <span
                      className={`currency-flag  currency-flag-${curr.toLowerCase()} `}
                    ></span>
                    <p className="flex flex-col items-start ">
                      <span className="font-semibold dark:text-white">{curr}</span>{" "}
                      <span className="text-slate-500 text-left dark:text-slate-300">
                        {symbols[curr]}
                      </span>
                    </p>
                  </button>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
