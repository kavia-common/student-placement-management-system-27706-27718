import React, { useState } from "react";
import { uploadResume } from "../../services/mockApi";

// PUBLIC_INTERFACE
export default function ResumeUpload(){
  /** Upload resume file; mocked endpoint stores file metadata only. */
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function onFileChange(e){
    setFile(e.target.files?.[0] || null);
  }

  async function onSubmit(e){
    e.preventDefault();
    const res = await uploadResume(file);
    setMessage(res?.ok ? "Resume uploaded successfully." : "Please select a file to upload.");
    setTimeout(()=>setMessage(""), 2000);
  }

  return (
    <div className="container">
      <div className="surface" style={{marginTop: 16}}>
        <div className="section-title">Resume Upload</div>
        {message && <div className="badge info" role="status">{message}</div>}
        <form onSubmit={onSubmit} style={{marginTop: 12}}>
          <input type="file" className="input" accept=".pdf,.doc,.docx" onChange={onFileChange} />
          <div style={{display:"flex", gap:10, marginTop: 12}}>
            <button className="btn secondary" type="submit">Upload</button>
            {file && <span style={{color:"var(--muted)"}}>Selected: {file.name}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
