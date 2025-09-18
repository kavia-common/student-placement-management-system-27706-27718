/**
 * Mock REST API service using localStorage to persist minimal data.
 * Replace with real fetch calls to the backend when available.
 */

const delay = (ms=300) => new Promise(res=>setTimeout(res, ms));
const LS = {
  profile: "pf_profile",
  resume: "pf_resume_meta",
  status: "pf_status",
  students: "pf_students",
  criteria: "pf_criteria"
};

// Seed some sample students for staff shortlist view
function seedStudents(){
  if(localStorage.getItem(LS.students)) return;
  const sample = [
    { id: 'S1', name:'Aarav Kumar', email:'aarav@univ.edu', department:'CSE', cgpa:8.1, backlogs:0, skills:'React, Node' },
    { id: 'S2', name:'Diya Sharma', email:'diya@univ.edu', department:'ECE', cgpa:7.4, backlogs:1, skills:'Python, ML' },
    { id: 'S3', name:'Rahul Verma', email:'rahul@univ.edu', department:'IT', cgpa:9.0, backlogs:0, skills:'Java, Spring' },
    { id: 'S4', name:'Meera Rao', email:'meera@univ.edu', department:'EEE', cgpa:6.8, backlogs:2, skills:'SQL, BI' },
  ];
  localStorage.setItem(LS.students, JSON.stringify(sample));
}
seedStudents();

// PUBLIC_INTERFACE
export async function getStudentProfile(){
  /** Returns student profile from localStorage or null. */
  await delay();
  const raw = localStorage.getItem(LS.profile);
  return raw ? JSON.parse(raw) : null;
}

// PUBLIC_INTERFACE
export async function saveStudentProfile(profile){
  /** Saves profile; also upserts into students list for staff view. */
  await delay();
  localStorage.setItem(LS.profile, JSON.stringify(profile));
  try{
    const list = JSON.parse(localStorage.getItem(LS.students) || "[]");
    const id = profile.email || profile.name || `S${list.length+1}`;
    const next = list.filter(s=>s.email !== profile.email);
    next.push({
      id, name: profile.name, email: profile.email, department: profile.department,
      cgpa: Number(profile.cgpa || 0), backlogs: Number(profile.backlogs || 0), skills: profile.skills || ""
    });
    localStorage.setItem(LS.students, JSON.stringify(next));
    return { ok: true };
  }catch(e){
    return { ok: false, error: String(e) };
  }
}

// PUBLIC_INTERFACE
export async function uploadResume(file){
  /** Stores resume metadata only; real API should upload file to storage. */
  await delay();
  if(!file) return { ok: false, error: "No file." };
  const meta = { name: file.name, size: file.size, type: file.type, uploadedAt: new Date().toISOString() };
  localStorage.setItem(LS.resume, JSON.stringify(meta));
  return { ok: true, meta };
}

// PUBLIC_INTERFACE
export async function getPlacementStatus(){
  /** Returns placement status. */
  await delay();
  const raw = localStorage.getItem(LS.status);
  return raw ? JSON.parse(raw) : null;
}

// PUBLIC_INTERFACE
export async function updatePlacementStatus(status){
  /** Updates placement status. */
  await delay();
  localStorage.setItem(LS.status, JSON.stringify(status));
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function addCompanyCriteria(criteria){
  /** Adds a company criteria. */
  await delay();
  const list = JSON.parse(localStorage.getItem(LS.criteria) || "[]");
  list.push(criteria);
  localStorage.setItem(LS.criteria, JSON.stringify(list));
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function getCompanyCriteriaList(){
  /** Returns list of all saved company criteria. */
  await delay();
  return JSON.parse(localStorage.getItem(LS.criteria) || "[]");
}

// PUBLIC_INTERFACE
export async function getAllStudents(){
  /** Returns students visible to staff. */
  await delay();
  return JSON.parse(localStorage.getItem(LS.students) || "[]");
}
