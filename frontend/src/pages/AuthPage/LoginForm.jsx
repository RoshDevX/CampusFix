import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm({ onCreateAccount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/studentdashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <title>Login - CampusFix</title>
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-5 sm:p-7 md:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 text-white bg-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>

            <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg">
              Campus Portal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Sign in to CampusFix
          </h1>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            Enter your campus credentials to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your campus email"
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <i className="fa-solid fa-unlock-keyhole absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-teal-700 font-semibold hover:text-teal-800 hover:underline transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
