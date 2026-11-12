import { Link } from "react-router";

function RecentIssues({ issues, loading, error }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
          My Recent Issues
        </h2>

        <Link
          to="/my-issues"
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
        >
          View all <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="bg-slate-50">
              <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    Loading recent issues...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-sm text-red-600"
                  >
                    Unable to load complaints.
                  </td>
                </tr>
              ) : issues.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No complaints reported yet.
                  </td>
                </tr>
              ) : (
                issues.slice(0, 3).map((issue) => (
                  <tr
                    key={issue._id}
                    className="border-t border-slate-100 transition-colors duration-200 hover:bg-teal-50/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                          <i className="fa-regular fa-circle-dot"></i>
                        </div>
                        <span className="whitespace-nowrap text-sm font-semibold text-slate-700">
                          {issue.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {issue.category}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {issue.location}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          issue.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : issue.status === "In Progress"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-200 text-emerald-700"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default RecentIssues;
