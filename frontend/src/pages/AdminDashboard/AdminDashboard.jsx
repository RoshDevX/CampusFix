import { useState, useEffect } from "react";
import { Link } from "react-router";
import DashboardHeader from "../../components/DashboardHeader";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/complaints/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch complaints.");
        }
        setIssues(data.complaints || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaints();
  }, []);

  const totalIssues = issues.length;

  const pendingCount = issues.filter(
    (issue) => issue.status === "Pending",
  ).length;

  const inProgressCount = issues.filter(
    (issue) => issue.status === "In Progress",
  ).length;

  const resolvedCount = issues.filter(
    (issue) => issue.status === "Resolved",
  ).length;

  const statistics = [
    {
      title: "Total Issues",
      count: totalIssues,
      label: "All time",
      icon: "fa-folder-open",
      color: "bg-teal-50 text-teal-600",
      countColor: "text-slate-900",
    },
    {
      title: "Pending",
      count: pendingCount,
      label: "Awaiting Review",
      icon: "fa-clock",
      color: "bg-amber-50 text-amber-600",
      countColor: "text-amber-700",
    },
    {
      title: "In Progress",
      count: inProgressCount,
      label: "Dispatched",
      icon: "fa-rotate",
      color: "bg-blue-50 text-blue-600",
      countColor: "text-blue-700",
    },
    {
      title: "Resolved",
      count: resolvedCount,
      label: "Fixed",
      icon: "fa-circle-check",
      color: "bg-emerald-50 text-emerald-600",
      countColor: "text-emerald-700",
    },
  ];

  return (
    <>
    <title>Admin Dashboard</title>
      <DashboardHeader role="admin" />

      <main className="mx-auto max-w-350 space-y-8 px-5 py-6 md:px-8 mt-20">
        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage and monitor campus complaints.
            </p>
          </div>

          <Link
            to="/admin/all-issues"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 self-start rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all duration-200 hover:bg-teal-700 hover:shadow-lg sm:self-auto"
          >
            View All Complaints
          </Link>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-600">
                    {item.title}
                  </p>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${item.color}`}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-2">
                  <h2
                    className={`text-3xl font-bold tracking-tight ${item.countColor}`}
                  >
                    {loading ? "-" : item.count}
                  </h2>

                  <span
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${item.color}`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            Recent Issues
          </h2>
        </div>

        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
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
                      Loading complaints...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-10 text-center text-sm text-red-600"
                    >
                      {error}
                    </td>
                  </tr>
                ) : issues.length > 0 ? (
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

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-600">
                          {issue.category}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-600">
                          {issue.location}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
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
                                : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 mt-10">
        <div className="mx-auto flex max-w-350 flex-col justify-between gap-3 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center md:px-8">
          <p>
            © 2026 CampusFix. University Facilities &amp; Campus Operations.
          </p>
        </div>
      </footer>
    </>
  );
}

export default AdminDashboard;
