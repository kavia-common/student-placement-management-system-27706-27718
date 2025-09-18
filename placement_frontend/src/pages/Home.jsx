import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Home(){
  /** Home landing with option cards for Staff and Student. */
  return (
    <div>
      <section className="hero">
        <div className="brand-badge" style={{margin:"0 auto 14px"}} />
        <h1 className="hero-title">Placement Management</h1>
        <p className="hero-sub">
          A refined, elegant portal for students and staff to streamline placement processes.
        </p>
      </section>

      <div className="container">
        <div className="card-grid">
          <div className="option-card">
            <div className="option-title">Student Portal</div>
            <div className="option-desc">
              Create and update your profile, upload resumes, and manage your placement status.
            </div>
            <div style={{display:"flex", gap:10}}>
              <Link className="btn" to="/student">Open Dashboard</Link>
              <Link className="btn ghost" to="/student/profile">Edit Profile</Link>
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Staff Portal</div>
            <div className="option-desc">
              Add company criteria, filter students by department and profile, and shortlist efficiently.
            </div>
            <div style={{display:"flex", gap:10}}>
              <Link className="btn secondary" to="/staff">Staff Dashboard</Link>
              <Link className="btn ghost" to="/staff/shortlist">Shortlist</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
