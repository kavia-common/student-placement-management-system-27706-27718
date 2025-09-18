import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './index.css';
import { theme } from './theme';
import Home from './pages/Home';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ResumeUpload from './pages/student/ResumeUpload';
import PlacementStatus from './pages/student/PlacementStatus';
import StaffDashboard from './pages/staff/StaffDashboard';
import CompanyCriteria from './pages/staff/CompanyCriteria';
import Shortlist from './pages/staff/Shortlist';

// PUBLIC_INTERFACE
function App() {
  /** Main application wrapper that sets up routes, navigation, and theme.
   * Routes:
   *  - / : Home with role selection
   *  - /student : Student dashboard
   *  - /student/profile : Create/Update profile
   *  - /student/resume : Upload resume
   *  - /student/status : Placement status management
   *  - /staff : Staff dashboard
   *  - /staff/criteria : Company criteria entry
   *  - /staff/shortlist : Filter/Shortlist students by criteria/department
   */
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand" aria-label="Placement Home">
            <span className="brand-badge" />
            Placement Portal
          </Link>
          <div className="nav-actions">
            <NavLink to="/student" className={({isActive}) => `btn ghost ${isActive ? '' : ''}`}>Student</NavLink>
            <NavLink to="/staff" className={({isActive}) => `btn ghost ${isActive ? '' : ''}`}>Staff</NavLink>
            <a className="btn" href="#" onClick={(e)=>e.preventDefault()} style={{background: theme.colors.primary}}>Get Help</a>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/resume" element={<ResumeUpload />} />
        <Route path="/student/status" element={<PlacementStatus />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/criteria" element={<CompanyCriteria />} />
        <Route path="/staff/shortlist" element={<Shortlist />} />
      </Routes>
      <footer className="footer">Ocean Professional · Elegant · © {new Date().getFullYear()}</footer>
    </BrowserRouter>
  );
}

export default App;
