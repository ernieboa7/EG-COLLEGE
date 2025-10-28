import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// === Public Pages ===
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ApplyForm from "./pages/ApplyForm.jsx";

// === Layouts & Components ===
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleGuard from "./routes/RoleGuard.jsx";

// === Student Portal ===
import PortalLayout from "./pages/portal/PortalLayout.jsx";
import Dashboard from "./pages/portal/Dashboard.jsx";
import Results from "./pages/portal/Results.jsx";
import Timetable from "./pages/portal/Timetable.jsx";
import Courses from "./pages/portal/Courses.jsx";
import Fees from "./pages/portal/Fees.jsx";
import Library from "./pages/portal/Library.jsx";
import Projects from "./pages/portal/Projects.jsx";
import Committees from "./pages/portal/Committees.jsx";
import MyBorrows from "./pages/portal/MyBorrows.jsx";

// === Teacher Pages ===
import TeacherLayout from "./pages/teacher/TeacherLayout.jsx";

// === Admin Pages ===
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Applicants from "./pages/admin/Applicants.jsx";
import Admissions from "./pages/admin/Admissions.jsx";
import AdminDepartments from "./pages/admin/Departments.jsx";
import AdminCourses from "./pages/admin/Courses.jsx";
import AdminTimetables from "./pages/admin/Timetables.jsx";
import AdminResults from "./pages/admin/Results.jsx";
import AdminLibrary from "./pages/admin/Library.jsx";
import AdminProjects from "./pages/admin/Projects.jsx";
import AdminCommittees from "./pages/admin/Committees.jsx";
import AdminFinance from "./pages/admin/Finance.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply" element={<ApplyForm />} /> {/* Public apply page */}

        {/* ================= STUDENT PORTAL (Protected) ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="results" element={<Results />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="courses" element={<Courses />} />
            <Route path="fees" element={<Fees />} />
            <Route path="library" element={<Library />} />
            <Route path="my-borrows" element={<MyBorrows />} />

            <Route path="projects" element={<Projects />} />
            <Route path="committees" element={<Committees />} />
          </Route>
        </Route>
        

        {/* Teachers Portal */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleGuard allow={["teacher"]} />}>
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<AdminDashboard/>} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="timetables" element={<AdminTimetables />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="library" element={<AdminLibrary />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="committees" element={<AdminCommittees />} />
            </Route>
          </Route>
        </Route>


        {/* ================= ADMIN PORTAL (Protected + RoleGuard) ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleGuard allow={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard/>} />
              {/*<Route index element={<Navigate to="admissions" replace />} /> */}
              <Route path="admissions" element={<Admissions />} />
              <Route path="applicants" element={<Applicants />} /> {/* Admin manage applicants */}
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="timetables" element={<AdminTimetables />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="library" element={<AdminLibrary />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="committees" element={<AdminCommittees />} />
              <Route path="finance" element={<AdminFinance />} />
            </Route>
          </Route>
        </Route>

        {/* ================= CATCH-ALL ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
