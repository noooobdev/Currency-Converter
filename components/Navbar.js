import { useState, useEffect } from "react";
import { FcCurrencyExchange } from "react-icons/fc";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className=" shadow-lg p-2 dark:shadow-[#3d3d3d]">
      <div className="flex items-center">
        {/* <h1 className="text-4xl font-extrabold dark:text-white">CC</h1> */}
        <FcCurrencyExchange className="h-12 w-12"/>

        <div className="gap-10 flex ml-auto mr-10 text-xl  items-center font-semibold">
          <button onClick={handleTheme} className="dark:bg-slate-100 bg-slate-600  p-2 rounded-xl">
            {theme==="dark" ?
            <FaSun className="text-yellow-400"/>

             :  <h1>
             <FaMoon className="text-white"/>

             </h1>}
          </button>
          <div className="flex gap-2">
          <h1 className="font-normal text-lg dark:text-white">Powered By</h1>
          <h1 className="dark:text-white">Sozo </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
