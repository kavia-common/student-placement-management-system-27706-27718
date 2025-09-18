import React, { useEffect, useMemo, useState } from "react";
import { getAllStudents, getCompanyCriteriaList } from "../../services/mockApi";

// PUBLIC_INTERFACE
export default function Shortlist(){
  /** Filter and shortlist students by department and criteria; shows eligibility badges. */
  const [students, setStudents] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [filters, setFilters] = useState({ department: "All", minCgpa: "", maxBacklogs: "", search: "", byCompany: "All" });

  useEffect(()=>{
    async function load(){
      setStudents(await getAllStudents());
      setCriteria(await getCompanyCriteriaList());
    }
    load();
  },[]);

  function onChange(e){
    setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const filtered = useMemo(()=>{
    return students.filter(s=>{
      if(filters.department !== "All" && s.department !== filters.department) return false;
      if(filters.minCgpa && Number(s.cgpa) < Number(filters.minCgpa)) return false;
      if(filters.maxBacklogs && Number(s.backlogs) > Number(filters.maxBacklogs)) return false;
      if(filters.search && !(s.name.toLowerCase().includes(filters.search.toLowerCase()) || s.email.toLowerCase().includes(filters.search.toLowerCase()))) return false;
      return true;
    });
  }, [students, filters]);

  function eligibilityForCompanies(student){
    if(!criteria.length) return [];
    return criteria.map(c=>{
      const eligibleDept = c.eligibleDepartments.includes(student.department);
      const okCgpa = Number(student.cgpa) >= Number(c.minCgpa);
      const okBacklogs = Number(student.backlogs) <= Number(c.allowedBacklogs);
      const isEligible = eligibleDept && okCgpa && okBacklogs;
      return { company: c.companyName, eligible: isEligible };
    });
  }

  const departments = ["All","CSE","IT","ECE","EEE","MECH","CIVIL"];

  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Shortlist Students</div>
        <div className="form-grid" style={{marginBottom: 10}}>
          <div>
            <label>Department</label>
            <select className="input" name="department" value={filters.department} onChange={onChange}>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label>Min CGPA</label>
            <input className="input" name="minCgpa" value={filters.minCgpa} onChange={onChange} placeholder="e.g., 7.0" />
          </div>
          <div>
            <label>Max Backlogs</label>
            <input className="input" name="maxBacklogs" value={filters.maxBacklogs} onChange={onChange} placeholder="e.g., 0" />
          </div>
          <div>
            <label>Search</label>
            <input className="input" name="search" value={filters.search} onChange={onChange} placeholder="Name or email" />
          </div>
        </div>

        <div className="surface" style={{padding:0}}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Dept</th><th>CGPA</th><th>Backlogs</th><th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s=>{
                const results = eligibilityForCompanies(s);
                return (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.department}</td>
                    <td>{s.cgpa}</td>
                    <td>{s.backlogs}</td>
                    <td>
                      {results.length === 0 ? <span className="badge warn">No criteria</span> :
                        <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                          {results.map(r => (
                            <span key={r.company} className={`badge ${r.eligible?'success':'error'}`}>
                              {r.company}: {r.eligible? 'Eligible':'Not Eligible'}
                            </span>
                          ))}
                        </div>
                      }
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{color:"var(--muted)", padding:"18px"}}>No students found for the selected filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
