import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 px-6 md:px-12 lg:px-20 py-12 md:py-14">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            <i className="fa-solid fa-graduation-cap text-teal-400 mr-2"></i>{" "}
            Campus<span className="text-teal-400">Fix</span>
          </h2>
          <p className="text-sm leading-7 text-slate-400 max-w-xs">
            A better way to report and resolve campus issues. Transparent
            tracking, operational speed, and reliable campus maintenance
            management.
          </p>
          <p className="text-xs text-slate-500 mt-6">
            © 2026 CampusFix. Built for a better campus.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-teal-300 mb-5">
            QUICK LINKS
          </h3>
          <nav>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
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
                  href="#how-it-works"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-teal-300 mb-5">
            ACCOUNT
          </h3>

          <nav>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-teal-300 mb-5">
            CONTACT
          </h3>

          <nav>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer text-slate-400 hover:text-teal-300 transition-colors duration-200">
                Contact Us
              </li>
              <li className="cursor-pointer text-slate-400 hover:text-teal-300 transition-colors duration-200">
                Campus Helpdesk
              </li>
            </ul>
          </nav>

          <div className="flex flex-wrap gap-x-4 gap-y-3 text-xs text-slate-500 mt-8">
            <p className="cursor-pointer text-slate-400 hover:text-teal-300 transition-colors duration-200">
              Privacy Policy
            </p>
            <p className="cursor-pointer text-slate-400 hover:text-teal-300 transition-colors duration-200">
              Terms of Service
            </p>
            <p className="cursor-pointer text-slate-400 hover:text-teal-300 transition-colors duration-200">
              Student Guidelines
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
