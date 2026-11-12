import { Link } from 'react-router';

function Announcement() {
  return (
    <>
      <div className="bg-teal-700 w-full max-w-7xl text-center rounded-2xl mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-16 shadow-lg">
        <p className="bg-teal-600 inline-block text-xs text-white font-bold tracking-wider px-4 py-2 rounded-full border border-teal-500">
          <i className="fa-solid fa-bullhorn"></i> CAMPUS COMMUNITY INITIATIVE
        </p>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-5">
          Help Make Your Campus Better.
        </h2>
        <p className="mt-4 text-teal-50 text-sm sm:text-base max-w-2xl mx-auto leading-8">
          See something that needs fixing? Speak up and help create a cleaner,
          safer, and better learning environment for everyone.
        </p>

        <Link to="/signup"
          className="inline-flex items-center justify-center bg-white text-teal-700 font-semibold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-200 hover:bg-teal-50 hover:shadow-lg cursor-pointer whitespace-nowrap mt-7"
        >
          Get Started Now{" "}
          <i className="fa-solid fa-circle-arrow-right ml-2"></i>
        </Link>

        <p className="mt-5 text-xs sm:text-sm text-teal-100 leading-6">
          It only takes a few minutes to report an issue. Free for all
          university students, staff, and faculty.
        </p>
      </div>
    </>
  );
}

export default Announcement;
