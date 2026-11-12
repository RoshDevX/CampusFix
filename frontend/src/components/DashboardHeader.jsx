import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";

function DashboardHeader({ role = "student" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = {
    student: [
      { label: "Dashboard", path: "/studentdashboard" },
      { label: "My Issues", path: "/my-issues" },
    ],
    admin: [
      { label: "Dashboard", path: "/admindashboard" },
      { label: "All Issues", path: "/admin/all-issues" },
    ],
  };

  const links = navigation[role] || navigation.student;

  function handleNavigation(path) {
    setMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);
    navigate("/login");
  }

  function renderLinks() {
    return links.map((item) => (
      <li key={item.path}>
        <Link
          to={item.path}
          onClick={() => handleNavigation(item.path)}
          className={`text-md font-semibold transition-colors duration-200 ${
            location.pathname === item.path
              ? "text-teal-600"
              : "text-slate-600 hover:text-teal-600"
          }`}
        >
          {item.label}
        </Link>
      </li>
    ));
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between bg-white/95 backdrop-blur-md  border-b border-slate-200 px-5 md:px-10 py-4 shadow-sm">
      <div className="flex justify-center items-center gap-2 md:gap-4">
        <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap text-slate-800">
          <i className="fa-solid fa-graduation-cap text-teal-600 mr-2"></i>{" "}
          Campus
          <span className="text-teal-600">Fix</span>
        </h1>
      </div>

      {/* Navbar */}
      <nav className="hidden lg:block">
        <ul className="flex gap-6">{renderLinks()}</ul>
      </nav>

      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
        >
          Logout <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      </div>

      <button
        type="button"
        className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
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

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-full right-3 z-50 w-[calc(100vw-24px)] max-w-80 lg:hidden bg-white shadow-2xl border border-slate-200 px-5 py-5 rounded-2xl">
            <nav>
              <ul className="flex flex-col gap-4">{renderLinks()}</ul>
            </nav>

            <div className="mt-5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-100"
              >
                Logout <i className="fa-solid fa-right-to-bracket"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default DashboardHeader;
