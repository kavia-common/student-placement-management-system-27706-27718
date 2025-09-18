import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function StudentDashboard(){
  /** Student dashboard with quick links and a status snapshot. */
  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Student Dashboard</div>
        <p style={{color:"var(--muted)", marginTop:0}}>
          Manage your profile, resume, and placement status from here.
        </p>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <Link className="btn" to="/student/profile">Update Profile</Link>
          <Link className="btn secondary" to="/student/resume">Upload Resume</Link>
          <Link className="btn" to="/student/status">Placement Status</Link>
          <Link className="btn ghost" to="/">Back Home</Link>
        </div>
      </div>
    </div>
  );
}
