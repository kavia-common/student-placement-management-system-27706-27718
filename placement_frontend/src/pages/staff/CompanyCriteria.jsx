import React, { useState } from "react";
import { addCompanyCriteria } from "../../services/mockApi";

// PUBLIC_INTERFACE
export default function CompanyCriteria(){
  /** Staff form to add company placement criteria. */
  const [form, setForm] = useState({
    companyName: "", minCgpa: 6.0, allowedBacklogs: 0, eligibleDepartments: ["CSE","IT"],
    roles: "", ctc: "", location: "", lastDate: ""
  });
  const [message, setMessage] = useState("");

  function onChange(e){
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  function onDeptToggle(dept){
    setForm(prev => {
      const set = new Set(prev.eligibleDepartments);
      if(set.has(dept)) set.delete(dept); else set.add(dept);
      return {...prev, eligibleDepartments: Array.from(set)};
    });
  }

  async function onSubmit(e){
    e.preventDefault();
    const res = await addCompanyCriteria(form);
    setMessage(res?.ok ? "Criteria saved." : "Failed to save.");
    setTimeout(()=>setMessage(""), 2000);
  }

  const departments = ["CSE","IT","ECE","EEE","MECH","CIVIL"];
  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Company Criteria</div>
        {message && <div className="badge info" role="status">{message}</div>}
        <form onSubmit={onSubmit} style={{marginTop: 10}}>
          <div className="form-grid">
            <div>
              <label>Company Name</label>
              <input className="input" name="companyName" value={form.companyName} onChange={onChange} required />
            </div>
            <div>
              <label>Minimum CGPA</label>
              <input className="input" type="number" step="0.1" name="minCgpa" value={form.minCgpa} onChange={onChange} />
            </div>
            <div>
              <label>Allowed Backlogs</label>
              <input className="input" type="number" name="allowedBacklogs" value={form.allowedBacklogs} onChange={onChange} />
            </div>
            <div>
              <label>CTC (LPA)</label>
              <input className="input" name="ctc" value={form.ctc} onChange={onChange} placeholder="8" />
            </div>
            <div>
              <label>Location</label>
              <input className="input" name="location" value={form.location} onChange={onChange} placeholder="Bangalore, Remote" />
            </div>
            <div>
              <label>Application Last Date</label>
              <input className="input" type="date" name="lastDate" value={form.lastDate} onChange={onChange} />
            </div>
            <div style={{gridColumn:"1 / -1"}}>
              <label>Roles</label>
              <input className="input" name="roles" value={form.roles} onChange={onChange} placeholder="SDE, Analyst" />
            </div>
          </div>
          <div style={{marginTop: 12}}>
            <label>Eligible Departments</label>
            <div style={{display:"flex", flexWrap:"wrap", gap:8, marginTop:8}}>
              {departments.map(d => (
                <button type="button" key={d} onClick={()=>onDeptToggle(d)}
                  className={`btn ghost ${form.eligibleDepartments.includes(d)?'':'inactive'}`}
                  style={{border: form.eligibleDepartments.includes(d) ? '1px solid var(--primary)' : '1px dashed rgba(0,0,0,.15)'}}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"flex", gap:10, marginTop: 14}}>
            <button className="btn" type="submit">Save Criteria</button>
            <button className="btn ghost" type="button" onClick={()=>window.history.back()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
