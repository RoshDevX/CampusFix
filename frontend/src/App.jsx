import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import ComplaintCreate from "./pages/Complaints/ComplaintCreate";
import MyComplaints from "./pages/Complaints/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AllComplaints from "./pages/AdminDashboard/AllComplaints";
import ComplaintDetails from "./pages/AdminDashboard/ComplaintDetails";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route
        path="/studentdashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report-issue"
        element={
          <ProtectedRoute allowedRole="student">
            <ComplaintCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-issues"
        element={
          <ProtectedRoute allowedRole="student">
            <MyComplaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/all-issues"
        element={
          <ProtectedRoute allowedRole="admin">
            <AllComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaint/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <ComplaintDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
