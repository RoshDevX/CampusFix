import { useState, useEffect } from "react";
import { Link } from "react-router";
import DashboardHeader from "../../components/DashboardHeader";

function AllComplaints() {
  const [search, setSearch] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
          throw new Error(data.message || "Failed to fetch complaints");
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

  const filteredIssues = issues.filter((issue) => {
    return `${issue.title} ${issue.location} ${issue.category}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  async function handleChange(id, newStatus) {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/update-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id
            ? { ...issue, status: data.complaint.status }
            : issue,
        ),
      );

      setSuccess("Complaint status updated successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <title>All Issues</title>
      <div className="flex  min-h-screen flex-col">
        <DashboardHeader role="admin" />

        {error && (
          <div className="fixed right-5 top-24 z-50 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="fixed right-5 top-24 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-lg">
            <i className="fa-solid fa-circle-check mr-2"></i>
            {success}
          </div>
        )}

        <main className="mx-auto w-full flex-1 max-w-350 space-y-7 px-5 py-6 md:px-8 mt-20">
          {/* Welcome Section */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-gray-900">
                All Complaints
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage campus complaints, update their status, and
                track maintenance progress.
              </p>
            </div>
          </section>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
            <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category or location"
              className="w-full min-w-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
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
                    <th className="px-4 py-3 font-medium">Update Status</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-10 text-center text-sm text-slate-500"
                      >
                        Loading complaints...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-10 text-center text-sm text-red-600"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
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
                          {new Date(issue.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
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
                        <td className="px-4 py-3">
                          <select
                            name="status"
                            value={issue.status}
                            onChange={(e) =>
                              handleChange(issue._id, e.target.value)
                            }
                            required
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/admin/complaint/${issue._id}`}
                            className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 transition-colors duration-200 hover:bg-teal-100"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
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
        <footer className="bg-slate-900 mt-10">
          <div className="mx-auto flex max-w-350 flex-col justify-between gap-3 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center md:px-8">
            <p>
              © 2026 CampusFix. University Facilities &amp; Campus Operations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default AllComplaints;
