import { Link } from "react-router";

function HelpfulMessage() {
  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-teal-100 bg-teal-50/50 p-5 sm:flex-row sm:items-center sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 text-lg">
          <i className="fa-solid fa-bullhorn"></i>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            Notice something that needs repair?
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Something broken on campus? Report it to help keep your campus safe
            and functional.
          </p>
        </div>
      </div>

      <Link
        to="/report-issue"
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
      >
        <i className="fa-solid fa-plus"></i> Report an Issue
      </Link>
    </section>
  );
}

export default HelpfulMessage;
