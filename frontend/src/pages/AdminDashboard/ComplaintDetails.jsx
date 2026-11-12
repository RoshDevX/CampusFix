import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import DashboardHeader from "../../components/DashboardHeader";

function ComplaintDetails() {
  const { id } = useParams(); //to get the complaint ID from the URL.

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/complaints/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch complaint");
        }

        setComplaint(data.complaint || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaint();
  }, [id]);

  return (
    <>
    <title>Complaint Details</title>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <DashboardHeader role="admin" />

        <main className="mx-auto mt-20 w-full max-w-350 flex-1 px-5 py-6 md:px-8">
          <Link
            to="/admin/all-issues"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            ← Back to All Complaints
          </Link>

          <h1 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Complaint Details
          </h1>

          {loading ? (
            <p className="mt-6 text-sm text-slate-500">
              Loading complaint details...
            </p>
          ) : error ? (
            <p className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </p>
          ) : complaint ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {complaint.title}
                </h2>
                <span
                  className={`inline-flex w-fit self-start items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                    complaint.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : complaint.status === "In Progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {complaint.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Priority
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {complaint.priority}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {complaint.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Submitted On
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Description
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {complaint.description}
                </p>

                {complaint.photo && (
                  <div className="mt-6">
                    <h3 className="text-base font-bold text-slate-800">
                      Attached Photo
                    </h3>

                    <img
                      src={`${import.meta.env.VITE_API_URL}${complaint.photo}`}
                      alt="Complaint evidence"
                      className="mt-3 max-h-96 w-full rounded-xl border border-slate-200 bg-slate-50 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="text-sm font-bold text-slate-800">
                  Student Information
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  Name: {complaint.student?.name || "Not available"}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Email: {complaint.student?.email || "Not available"}
                </p>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default ComplaintDetails;
