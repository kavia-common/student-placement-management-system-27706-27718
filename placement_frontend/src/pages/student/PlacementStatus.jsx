import React, { useEffect, useState } from "react";
import { getPlacementStatus, updatePlacementStatus } from "../../services/mockApi";

// PUBLIC_INTERFACE
export default function PlacementStatus(){
  /** Manage placement status; students can set preferences and availability. */
  const [status, setStatus] = useState({ currentStatus: "Open to Opportunities", preferredRoles: "", preferredLocations: "", noticePeriod: "Immediate" });
  const [message, setMessage] = useState("");

  useEffect(()=>{
    async function load(){
      const data = await getPlacementStatus();
      if (data) setStatus(prev=>({...prev, ...data}));
    }
    load();
  },[]);

  function onChange(e){
    setStatus(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  async function onSave(e){
    e.preventDefault();
    const res = await updatePlacementStatus(status);
    setMessage(res?.ok ? "Status updated." : "Failed to update.");
    setTimeout(()=>setMessage(""), 2000);
  }

  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Placement Status</div>
        {message && <div className="badge info" role="status">{message}</div>}
        <form onSubmit={onSave} style={{marginTop: 10}}>
          <div className="form-grid">
            <div>
              <label>Current Status</label>
              <select className="input" name="currentStatus" value={status.currentStatus} onChange={onChange}>
                <option>Open to Opportunities</option>
                <option>Interviewing</option>
                <option>Offer Received</option>
                <option>Placed</option>
                <option>Not Looking</option>
              </select>
            </div>
            <div>
              <label>Preferred Roles</label>
              <input className="input" name="preferredRoles" value={status.preferredRoles} onChange={onChange} placeholder="SDE, Analyst, Data Engineer" />
            </div>
            <div>
              <label>Preferred Locations</label>
              <input className="input" name="preferredLocations" value={status.preferredLocations} onChange={onChange} placeholder="Bangalore, Remote" />
            </div>
            <div>
              <label>Notice Period</label>
              <select className="input" name="noticePeriod" value={status.noticePeriod} onChange={onChange}>
                <option>Immediate</option>
                <option>15 Days</option>
                <option>30 Days</option>
                <option>60+ Days</option>
              </select>
            </div>
          </div>
          <div style={{display:"flex", gap:10, marginTop: 12}}>
            <button className="btn" type="submit">Save Status</button>
          </div>
        </form>
      </div>
    </div>
  );
}
