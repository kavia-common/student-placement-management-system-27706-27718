import React, { useEffect, useState } from "react";
import { saveStudentProfile, getStudentProfile } from "../../services/mockApi";

// PUBLIC_INTERFACE
export default function StudentProfile(){
  /** Form to create/update student profile with basic academic and personal details. */
  const [form, setForm] = useState({
    name: "", email: "", phone: "", department: "CSE",
    cgpa: "", backlogs: 0, skills: "", graduationYear: new Date().getFullYear()+1
  });
  const [message, setMessage] = useState("");

  useEffect(()=>{
    async function load(){
      const data = await getStudentProfile();
      if (data) setForm(prev => ({...prev, ...data}));
    }
    load();
  },[]);

  function onChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name==="backlogs" ? Number(value) : value }));
  }

  async function onSubmit(e){
    e.preventDefault();
    const res = await saveStudentProfile(form);
    if(res?.ok){
      setMessage("Profile saved successfully.");
      setTimeout(()=>setMessage(""), 2000);
    }else{
      setMessage("Failed to save profile.");
      setTimeout(()=>setMessage(""), 2500);
    }
  }

  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Student Profile</div>
        {message && (
          <div className="badge info" role="status" aria-live="polite">{message}</div>
        )}
        <form onSubmit={onSubmit} style={{marginTop: 12}}>
          <div className="form-grid">
            <div>
              <label>Name</label>
              <input className="input" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div>
              <label>Email</label>
              <input className="input" type="email" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label>Phone</label>
              <input className="input" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div>
              <label>Department</label>
              <select name="department" className="input" value={form.department} onChange={onChange}>
                <option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option><option>IT</option>
              </select>
            </div>
            <div>
              <label>CGPA</label>
              <input className="input" type="number" step="0.01" name="cgpa" value={form.cgpa} onChange={onChange} required />
            </div>
            <div>
              <label>Active Backlogs</label>
              <input className="input" type="number" name="backlogs" value={form.backlogs} onChange={onChange} />
            </div>
            <div>
              <label>Skills (comma separated)</label>
              <input className="input" name="skills" value={form.skills} onChange={onChange} placeholder="React, Node, SQL" />
            </div>
            <div>
              <label>Graduation Year</label>
              <input className="input" type="number" name="graduationYear" value={form.graduationYear} onChange={onChange} />
            </div>
          </div>
          <div style={{display:"flex", gap:10, marginTop: 14}}>
            <button className="btn" type="submit">Save Profile</button>
            <button className="btn ghost" type="reset" onClick={()=>setForm({
              name:"", email:"", phone:"", department:"CSE", cgpa:"", backlogs:0, skills:"", graduationYear: new Date().getFullYear()+1
            })}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
