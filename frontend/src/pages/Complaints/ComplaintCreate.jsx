import { useState } from "react";
import { Link } from "react-router";
import DashboardHeader from "../../components/DashboardHeader";

function CreateComplaint() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    location: "",
    description: "",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in first.");
      }

      const complaintData = new FormData(); //built-in JavaScript object. It supports both text data and files such as images and documents.

      complaintData.append("title", formData.title);
      complaintData.append("category", formData.category);
      complaintData.append("priority", formData.priority);
      complaintData.append("location", formData.location);
      complaintData.append("description", formData.description);

      if (photo) {
        complaintData.append("photo", photo);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: complaintData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit complaint");
      }

      setSuccess("Complaint submitted successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 4000);

      setFormData({
        title: "",
        category: "",
        priority: "Medium",
        location: "",
        description: "",
      });

      setPhoto(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <title>Complaint create</title>
      <DashboardHeader />

      <div className="min-h-screen bg-slate-50 pt-16 flex flex-col text-slate-800">
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-7 sm:px-6">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-teal-700">
              <i className="fa-solid fa-building"></i>
              Facilities & Logistics
            </span>

            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Create a Complaint
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Report a campus issue, and we'll help get it resolved promptly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            {error && (
              <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
                <i className="fa-solid fa-circle-check mr-2"></i>
                {success}
              </p>
            )}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Complaint Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Water leakage in 2nd floor restroom"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Select a category</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Internet">Internet / Wi-Fi</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Priority Level
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium (Affects daily tasks)</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Campus Location <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-location-dot text-sm text-teal-600"></i>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Block A, Room 203"
                  required
                  className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Description <span className="text-red-500">*</span>
                </label>

                <span className="text-xs text-slate-400">
                  {formData.description.length}/500 characters
                </span>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
                required
                rows={4}
                placeholder="Describe the issue in detail (exact spot, how long it has been occurring, hazard level)..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Attach Photo / Evidence (Optional)
              </label>

              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center transition-all duration-200 hover:border-teal-300 hover:bg-teal-50/50">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700 shadow-sm">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </span>

                <span className="text-sm font-semibold text-teal-700">
                  Click to upload or drag and drop
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  PNG, JPG up to 10MB
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    if (!selectedFile) return;

                    if (selectedFile.size > 10 * 1024 * 1024) {
                      setError("Images size must be less than 10MB.");
                      e.target.value = "";
                      return;
                    }

                    setError("");
                    setPhoto(selectedFile);
                  }}
                />
              </label>

              {photo && (
                <p className="mt-3 break-all text-sm text-slate-600">
                  <i className="fa-solid fa-paperclip mr-2"></i>
                  {photo.name}
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="ml-3 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
              <Link
                to="/studentdashboard"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all duration-200 hover:bg-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i className="fa-regular fa-paper-plane"></i>
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </main>

        <footer className="bg-slate-900 text-slate-300 mt-10">
          <div className="mx-auto flex max-w-350 flex-col justify-between gap-3 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center md:px-8">
            <p>
              © 2026 CampusFix. University Facilities &amp; Campus Operations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CreateComplaint;
