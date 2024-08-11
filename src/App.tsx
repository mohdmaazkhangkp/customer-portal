import { useState, useEffect } from "react";
import CustomerDetails from "./components/CustomerDetails";
import CustomersList from "./components/CustomersList";
import CloseIcon from "./assets/close.svg";
import HamburgerIcon from "./assets/burger-menu.svg";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <div className="h-screen flex flex-col">
      <header className="fixed z-20 top-0 left-0 w-full bg-white shadow-md border-b">
        <div className="p-3 flex">
          <button
            className="block sm:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <img
              src={showMenu ? CloseIcon : HamburgerIcon}
              className="size-5"
              alt={showMenu ? "Close Menu" : "Open Menu"}
            />
          </button>
          <h1 className="text-2xl font-bold text-center w-full">
            Customers Portal
          </h1>
        </div>
      </header>

      <div className="flex flex-1 mt-[60px]">
        <div
          className={`sm:w-[300px] ${showMenu ? "block" : "hidden"} sm:block`}
        >
          <CustomersList setShowMenu={setShowMenu} />
        </div>

        <div
          className={`w-full sm:w-auto flex-1 z-10 relative ${
            showMenu ? "blur-sm" : ""
          }`}
        >
          <CustomerDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
