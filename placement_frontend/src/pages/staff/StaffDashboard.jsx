import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function StaffDashboard(){
  /** Staff dashboard with quick links. */
  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Staff Dashboard</div>
        <p style={{color:"var(--muted)", marginTop:0}}>
          Add company criteria, filter and shortlist students department-wise, and track eligibility.
        </p>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <Link className="btn" to="/staff/criteria">Company Criteria</Link>
          <Link className="btn secondary" to="/staff/shortlist">Shortlist Students</Link>
          <Link className="btn ghost" to="/">Back Home</Link>
        </div>
      </div>
    </div>
  );
}
