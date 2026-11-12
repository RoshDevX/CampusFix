import { Link, useLocation } from "react-router";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-200 px-5 md:px-10 py-4 shadow-sm">
        <div className="flex justify-center items-center gap-2 md:gap-4">
          <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap text-slate-800">
            <i className="fa-solid fa-graduation-cap text-teal-700 mr-2"></i>
            Campus<span className="text-teal-700">Fix</span>
          </h1>
        </div>

        {isHomePage ? (
          <>
            <nav className="hidden lg:block">
              <ul className="flex gap-6">
                <li>
                  <a
                    href="/"
                    className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      history.replaceState(null, "", location.pathname);
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#categories"
                    className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-block bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer hover:bg-teal-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <i className="fa-solid fa-xmark text-xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-xl"></i>
              )}
            </button>
          </>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all duration-200 cursor-pointer whitespace-nowrap"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Back to Home
            </Link>
          </div>
        )}

        {isHomePage && menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute top-full right-3 z-50 w-[calc(100vw-24px)] max-w-80 lg:hidden bg-white shadow-2xl border border-slate-200 px-5 py-5 rounded-2xl">
              <nav>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        history.replaceState(null, "", location.pathname);
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#categories" onClick={() => setMenuOpen(false)}>
                      Categories
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a href="#about-us" onClick={() => setMenuOpen(false)}>
                      About Us
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex gap-3 mt-5">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center bg-teal-700 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Navbar;
