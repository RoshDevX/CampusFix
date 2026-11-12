import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import CategoryCard from "./CategoryCard";
import WorkCard from "./WorkCard";
import About from "./About";
import Announcement from "./Announcement";
import Footer from "../../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <div className="bg-slate-50">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12">
            {/* Left Content */}
            <div className="w-full max-w-xl space-y-6">
              <p className="inline-block rounded-full bg-teal-50 px-4 py-2 text-xs font-bold tracking-wider text-teal-700">
                <i className="fa-regular fa-circle-dot mr-1"></i>A BETTER CAMPUS
                STARTS HERE
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Your Campus. Your Voice.
                <span className="text-teal-700"> A Better Tomorrow.</span>
              </h1>

              <p className="text-base leading-8 text-slate-600 md:text-lg">
                Report campus issues, track your complaints, and help make your
                college a better place. CampusFix connects students with campus
                maintenance teams to resolve problems faster.
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  to="/login"
                  className="w-full cursor-pointer whitespace-nowrap rounded-xl bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-teal-800 hover:shadow-lg sm:w-auto md:text-base"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Report an Issue
                </Link>

                <a
                  href="/#how-it-works"
                  className="w-full cursor-pointer whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 sm:w-auto md:text-base"
                >
                  Explore How It Works
                </a>
              </div>

              <p className="text-sm font-medium text-slate-500">
                <i className="fa-solid fa-check-circle mr-2 text-teal-600"></i>
                Making campus life better, one issue at a time.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              {/* Decorative Border */}
              <div className="absolute -right-3 -top-3 h-full w-full rounded-3xl border-2 border-teal-200 sm:-right-4 sm:-top-4"></div>

              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-slate-200 shadow-xl">
                <img
                  src="/images/classroom.avif"
                  alt="A clean and well-maintained college classroom"
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Information Card */}
              <div className="absolute -bottom-5 left-4 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <i className="fa-solid fa-check-circle text-lg"></i>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Better Campus
                    </p>
                    <p className="text-xs text-slate-500">
                      Starts with your voice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="categories"
          className="scroll-mt-24 bg-white flex flex-col items-center justify-between gap-10 px-6 sm:px-8 lg:px-20 py-16 md:py-20"
        >
          <div className="w-full max-w-7xl text-center">
            <p className="bg-teal-50 inline-block text-xs text-teal-700 font-bold tracking-wider px-4 py-2 rounded-full">
              ISSUE CATEGORIES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-4">
              What Needs Fixing on Your Campus?
            </h2>
            <p className="mt-3 text-slate-600 leading-7 max-w-2xl mx-auto">
              From classroom maintenance to campus cleanliness, report the
              problems that matter.
            </p>
          </div>

          <CategoryCard />
        </div>

        <div
          id="how-it-works"
          className="scroll-mt-24 bg-slate-50 flex flex-col items-center justify-between gap-10 px-6 sm:px-8 lg:px-20 py-16 md:py-20"
        >
          <div className="w-full max-w-7xl text-center">
            <p className="bg-teal-50 inline-block text-xs text-teal-700 font-bold tracking-wider px-4 py-2 rounded-full">
              HOW IT WORKS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-4">
              Fixing Campus Issues Is Simple
            </h2>
            <p className="mt-3 text-slate-600 leading-7 max-w-2xl mx-auto">
              Three easy steps to make your campus safer, cleaner, and smarter.
            </p>
          </div>

          <WorkCard />
        </div>

        <div
          id="about-us"
          className="scroll-mt-24 bg-white flex flex-col items-center justify-between gap-10 px-6 sm:px-8 lg:px-20 py-16 md:py-20"
        >
          <div className="w-full max-w-7xl text-center">
            <p className="bg-teal-50 inline-block text-xs text-teal-700 font-bold tracking-wider px-4 py-2 rounded-full">
              WHY CAMPUSFIX
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-4">
              Small Reports. Big Improvements.
            </h2>
            <p className="mt-3 text-slate-600 leading-7 max-w-2xl mx-auto">
              Designed specifically for collegiate communities to replace messy
              paper registers and ignored emails.
            </p>
          </div>

          <About />
        </div>

        <div className="bg-slate-50 flex flex-col items-center justify-between gap-10 px-6 sm:px-8 lg:px-20 py-16 md:py-20">
          <Announcement />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;
