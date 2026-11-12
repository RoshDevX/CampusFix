import { Link } from "react-router";
import { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import StatisticsCard from "./StatisticsCard";
import RecentIssues from "./RecentIssues";
import HelpfulMessage from "./HelpfulMessage";

function StudentDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in first.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/complaints/my-complaints`,
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
  return (
    <>
      <title>Student Dashboard</title>
      <DashboardHeader role="student" />

      <main className="mx-auto max-w-350 space-y-8 px-5 py-6 md:px-8 mt-20">
        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-slate-900">
              Welcome back, Student!
            </h1>

            <p className="mt-2 text-sm text-slate-500 leading-6">
              Report campus problems and track your issues easily.
            </p>
          </div>

          <Link
            to="/report-issue"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 self-start rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all duration-200 hover:bg-teal-700 hover:shadow-lg sm:self-auto"
          >
            <i className="fa-solid fa-plus"></i> Report an Issue
          </Link>
        </section>

        {/* Statistics Cards */}
        <StatisticsCard issues={issues} loading={loading} error={error} />

        {/* Recent Issues */}
        <RecentIssues issues={issues} loading={loading} error={error} />

        {/* Helpful Message */}
        <HelpfulMessage />
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

export default StudentDashboard;
