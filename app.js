const API_URL = "https://script.google.com/macros/s/AKfycbwFxsj40cP9_JcNBh3bmjIrBkq4zMaqi2m0SF6KFjMTkLCe89M_hXRieJHWRZsyfdxW/exec"; // PASTE HERE

// The Data remains exactly the same as before
const roadmapData = [
  {
    phase: "Phase 1: Linux & The Command Line",
    weeks: [
      { id: "w1", title: "Navigation & File Management", diff: "Easy", hrs: "4h" },
      { id: "w2", title: "Text Manipulation (grep, awk)", diff: "Medium", hrs: "6h" },
      { id: "w3", title: "System Performance (top, htop)", diff: "Easy", hrs: "3h" },
      { id: "w4", title: "Permissions & Users", diff: "Medium", hrs: "5h" },
      { id: "w5", title: "Networking Utilities", diff: "Easy", hrs: "4h" },
      { id: "w6", title: "Bash Scripting Basics", diff: "Hard", hrs: "8h" }
    ]
  },
  {
    phase: "Phase 4: Containerization (Docker)",
    weeks: [
      { id: "w14", title: "Docker Daemon & CLI", diff: "Easy", hrs: "4h" },
      { id: "w15", title: "Writing Dockerfiles", diff: "Medium", hrs: "6h" },
      { id: "w16", title: "Volume Management", diff: "Medium", hrs: "5h" },
      { id: "w17", title: "Network Bridging", diff: "Hard", hrs: "7h" },
      { id: "w18", title: "Docker Compose", diff: "Hard", hrs: "8h" }
    ]
  },
  {
    phase: "Phase 5: AWS Cloud Infrastructure",
    weeks: [
      { id: "w20", title: "VPC Basics", diff: "Hard", hrs: "8h" },
      { id: "w22", title: "EC2 Provisioning", diff: "Medium", hrs: "5h" },
      { id: "w25", title: "RDS Database Basics", diff: "Medium", hrs: "5h" }
    ]
  }
];

const projectsData = [
  {
    id: "p1", title: "Containerized Calculator Tool",
    desc: "Dockerize your mutual fund calculator and serve it via Nginx.",
    diff: "Medium", requiredSkills: ["w1", "w14", "w15", "w18"]
  },
  {
    id: "p2", title: "Infrastructure as Code API",
    desc: "Deploy an entire AWS VPC, EC2, and RDS setup.",
    diff: "Expert", requiredSkills: ["w20", "w22", "w25"]
  }
];

let completedWeeks = [];
let isAdmin = false;
let activeTab = 'roadmap';
const totalWeeks = 52;

const els = {
  loadingScreen: document.getElementById('loading-screen'),
  appContainer: document.getElementById('app-container'),
  authContainer: document.getElementById('auth-container'),
  roadmapContent: document.getElementById('roadmap-content'),
  projectsContent: document.getElementById('projects-content'),
  viewOnlyWarning: document.getElementById('view-only-warning'),
  progressText: document.getElementById('progress-text'),
  progressBar: document.getElementById('progress-bar'),
  completedCount: document.getElementById('completed-count'),
  estDate: document.getElementById('est-date'),
  tabRoadmap: document.getElementById('tab-roadmap'),
  tabProjects: document.getElementById('tab-projects')
};

async function init() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    completedWeeks = Array.isArray(data) ? data : [];
  } catch (err) { console.error(err); }
  
  els.loadingScreen.classList.add('hidden');
  els.appContainer.classList.remove('hidden');
  els.appContainer.classList.add('slide-up');
  
  setupListeners();
  renderAll();
}

function renderAll() {
  renderAuth(); renderDashboard(); renderRoadmap(); renderProjects();
}

function renderAuth() {
  els.viewOnlyWarning.classList.toggle('hidden', isAdmin || activeTab !== 'roadmap');
  if (isAdmin) {
    els.authContainer.innerHTML = `<button id="btn-lock" class="btn btn-purple">Lock Mode 🔒</button>`;
    document.getElementById('btn-lock').onclick = () => { isAdmin = false; renderAll(); };
  } else {
    els.authContainer.innerHTML = `
      <form id="login-form">
        <input type="password" id="password-input" class="auth-input" placeholder="Admin Pass" />
        <button type="submit" class="btn btn-purple">Unlock 🔓</button>
      </form>
    `;
    document.getElementById('login-form').onsubmit = (e) => {
      e.preventDefault();
      if (document.getElementById('password-input').value === '0311') {
        isAdmin = true; renderAll();
      } else alert('Incorrect Password!');
    };
  }
}

function renderDashboard() {
  const pct = Math.round((completedWeeks.length / totalWeeks) * 100) || 0;
  els.progressText.innerText = `${pct}%`;
  els.progressBar.style.width = `${pct}%`;
  els.completedCount.innerText = completedWeeks.length;

  const rem = totalWeeks - completedWeeks.length;
  const d = new Date(); d.setDate(d.getDate() + (rem * 7));
  els.estDate.innerText = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function renderRoadmap() {
  let html = '';
  roadmapData.forEach(p => {
    html += `<div class="phase-card"><h3 class="phase-title">${p.phase}</h3><div class="week-grid">`;
    p.weeks.forEach(w => {
      const checked = completedWeeks.includes(w.id);
      html += `
        <div class="skill-item ${checked ? 'checked' : ''}" data-id="${w.id}" style="cursor:${isAdmin?'pointer':'not-allowed'}">
          <div class="custom-checkbox"></div>
          <div>
            <p class="skill-title">${w.title}</p>
            <span class="tag tag-${w.diff.toLowerCase()}">${w.diff}</span>
          </div>
          <div class="tooltip">Estimated: ${w.hrs}</div>
        </div>
      `;
    });
    html += `</div></div>`;
  });
  els.roadmapContent.innerHTML = html;
}

function renderProjects() {
  let html = '';
  projectsData.forEach(p => {
    const unlocked = p.requiredSkills.every(s => completedWeeks.includes(s));
    let skillsHtml = p.requiredSkills.map(s => {
      const done = completedWeeks.includes(s);
      return `<span class="req-skill ${done ? 'req-done' : 'req-miss'}">${s.toUpperCase()} ${done?'✓':''}</span>`;
    }).join('');

    html += `
      <div class="project-card ${unlocked ? 'unlocked' : 'locked'}">
        <div class="badge ${unlocked ? 'badge-unlocked' : 'badge-locked'}">${unlocked ? '🔓 UNLOCKED' : '🔒 LOCKED'}</div>
        <span class="tag tag-${p.diff.toLowerCase()}" style="margin-bottom:10px">${p.diff}</span>
        <h2>${p.title}</h2>
        <p style="color:var(--text-light); margin: 10px 0;">${p.desc}</p>
        <div style="margin-top:15px"><p style="font-size:0.8rem; font-weight:bold; margin-bottom:5px">REQUIRED SKILLS</p>${skillsHtml}</div>
      </div>
    `;
  });
  els.projectsContent.innerHTML = html;
}

function setupListeners() {
  els.tabRoadmap.onclick = () => switchTab('roadmap');
  els.tabProjects.onclick = () => switchTab('projects');
  els.roadmapContent.onclick = (e) => {
    if (!isAdmin) return;
    const card = e.target.closest('.skill-item');
    if (card) toggleWeek(card.dataset.id);
  };
}

function switchTab(tab) {
  activeTab = tab; renderAuth();
  els.tabRoadmap.className = `tab ${tab==='roadmap'?'active-tab bouncy':'inactive-tab'}`;
  els.tabProjects.className = `tab ${tab==='projects'?'active-tab bouncy':'inactive-tab'}`;
  els.roadmapContent.classList.toggle('hidden', tab!=='roadmap');
  els.projectsContent.classList.toggle('hidden', tab!=='projects');
  
  if (tab === 'roadmap') els.roadmapContent.classList.add('slide-up');
  if (tab === 'projects') els.projectsContent.classList.add('slide-up');
}

async function toggleWeek(id) {
  if (completedWeeks.includes(id)) completedWeeks = completedWeeks.filter(w => w !== id);
  else completedWeeks.push(id);
  
  renderDashboard(); renderRoadmap(); renderProjects();
  try {
    await fetch(API_URL, { method: 'POST', body: JSON.stringify(completedWeeks), headers: { 'Content-Type': 'text/plain' }});
  } catch (e) { console.error(e); }
}

init();