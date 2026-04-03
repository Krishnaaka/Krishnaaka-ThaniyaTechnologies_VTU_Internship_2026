// ══════════════════════════════════════════════════════
//   app.js — StudentIQ Dashboard Logic
//   Day13: Premium Redesign
// ══════════════════════════════════════════════════════

const API = 'http://localhost:3000';

// ── PAGE NAVIGATION ──────────────────────────────────
const navItems  = document.querySelectorAll('.nav-item');
const pages     = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.dataset.page;

    navItems.forEach(n => n.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(`page-${target}`).classList.add('active');
    pageTitle.textContent = item.querySelector('span').textContent;

    if (target === 'dashboard') loadStats();
    if (target === 'students')  loadStudents();

    if (window.innerWidth < 860) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

// Sidebar toggle (mobile)
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── API STATUS ───────────────────────────────────────
async function checkAPI() {
  try {
    await fetch(`${API}/`);
    const badge = document.getElementById('apiStatus');
    const dot   = badge.querySelector('.dot');
    const label = document.getElementById('apiLabel');
    dot.classList.add('online');
    label.textContent = 'API Online';
    badge.classList.add('online-badge');
  } catch { /* stays offline */ }
}

// ── GRADE HELPER ─────────────────────────────────────
function getGrade(marks) {
  if (marks >= 90) return { label: 'A+', cls: 'grade-A' };
  if (marks >= 75) return { label: 'A',  cls: 'grade-A' };
  if (marks >= 60) return { label: 'B',  cls: 'grade-B' };
  if (marks >= 45) return { label: 'C',  cls: 'grade-C' };
  return              { label: 'D',  cls: 'grade-D' };
}

// ── MARKS BAR COLOR ──────────────────────────────────
function marksColor(marks) {
  if (marks >= 75) return 'linear-gradient(90deg,#059669,#10b981)';
  if (marks >= 55) return 'linear-gradient(90deg,#0891b2,#06b6d4)';
  if (marks >= 40) return 'linear-gradient(90deg,#d97706,#f59e0b)';
  return 'linear-gradient(90deg,#be123c,#f43f5e)';
}

// ── AVATAR INITIALS ───────────────────────────────────
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

// ── DASHBOARD STATS ──────────────────────────────────
async function loadStats() {
  try {
    const res  = await fetch(`${API}/students/stats`);
    const json = await res.json();
    const d    = json.data;

    // Main cards
    document.getElementById('totalStudents').textContent = d.total;
    document.getElementById('avgMarks').textContent      = d.averageMarks;
    document.getElementById('topStudent').textContent    = d.topStudent;
    document.getElementById('highestMarks').textContent  = d.highestMarks;

    // Quick stats panel
    document.getElementById('qs-total').textContent    = d.total;
    document.getElementById('qs-top').textContent      = `${d.highestMarks}/100`;
    document.getElementById('qs-avg').textContent      = `${d.averageMarks}/100`;
    document.getElementById('qs-branches').textContent = Object.keys(d.byBranch).length;

    // Branch list
    const max  = Math.max(...Object.values(d.byBranch));
    const list = document.getElementById('branchList');
    list.innerHTML = Object.entries(d.byBranch)
      .sort((a,b) => b[1] - a[1])
      .map(([branch, count]) => `
        <div class="branch-row">
          <div class="branch-dot"></div>
          <span class="branch-name">${branch}</span>
          <span class="branch-count">${count}</span>
          <div class="branch-bar-wrap">
            <div class="branch-bar" style="width:${(count / max) * 100}%"></div>
          </div>
        </div>
      `).join('');
  } catch {
    document.getElementById('branchList').innerHTML =
      '<p class="loading-text" style="color:#fb7185"><i class="fas fa-circle-exclamation"></i> Could not connect to API. Start the backend server.</p>';
  }
}

// ── STUDENTS TABLE ───────────────────────────────────
async function loadStudents() {
  const tbody   = document.getElementById('studentTableBody');
  const search  = document.getElementById('searchInput').value.trim();
  const year    = document.getElementById('filterYear').value;
  const sortVal = document.getElementById('sortBy').value;

  tbody.innerHTML = `<tr><td colspan="7" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Fetching records…</td></tr>`;

  try {
    let url = `${API}/students?`;
    if (year) url += `year=${year}&`;
    if (sortVal) {
      const [field, order] = sortVal.split('-');
      url += `sortBy=${field}&order=${order}&`;
    }

    const res  = await fetch(url);
    const json = await res.json();
    let data   = json.data;

    // Client-side search
    if (search) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-cell"><i class="fas fa-user-slash" style="margin-right:.5rem;color:#475569"></i>No students match your filters</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map(s => {
      const g       = getGrade(s.marks);
      const color   = marksColor(s.marks);
      const initials = getInitials(s.name);
      return `
        <tr>
          <td><span class="td-id">#${s.id}</span></td>
          <td>
            <div class="td-name">
              <div class="td-avatar">${initials}</div>
              ${s.name}
            </div>
          </td>
          <td>
            <div class="td-branch">
              <i class="fas fa-building-columns"></i>
              ${s.branch}
            </div>
          </td>
          <td><span class="td-year"><i class="fas fa-calendar" style="font-size:.65rem"></i> Year ${s.year}</span></td>
          <td>
            <div class="marks-wrap">
              <span class="marks-num">${s.marks}</span>
              <div class="marks-bar-wrap">
                <div class="marks-bar" style="width:${s.marks}%;background:${color}"></div>
              </div>
            </div>
          </td>
          <td><span class="grade-badge ${g.cls}">${g.label}</span></td>
          <td>
            <button class="btn-action btn-delete" onclick="confirmDelete(${s.id},'${s.name}')" title="Delete student">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch {
    tbody.innerHTML = `<tr><td colspan="7" class="loading-cell" style="color:#fb7185"><i class="fas fa-circle-exclamation" style="margin-right:.5rem"></i>Could not reach API. Is the server running?</td></tr>`;
  }
}

// Live search / filter
document.getElementById('searchInput').addEventListener('input', loadStudents);
document.getElementById('filterYear').addEventListener('change', loadStudents);
document.getElementById('sortBy').addEventListener('change', loadStudents);

// ── ADD STUDENT FORM ─────────────────────────────────
document.getElementById('addStudentForm').addEventListener('submit', async e => {
  e.preventDefault();
  const toast  = document.getElementById('formToast');
  const btn    = document.getElementById('submitBtn');
  const name   = document.getElementById('newName').value.trim();
  const branch = document.getElementById('newBranch').value;
  const year   = document.getElementById('newYear').value;
  const marks  = document.getElementById('newMarks').value;

  toast.className   = 'form-toast';
  toast.textContent = '';
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enrolling…';

  try {
    const res  = await fetch(`${API}/students`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, branch, year: parseInt(year), marks: parseInt(marks) })
    });
    const json = await res.json();

    if (json.success) {
      toast.innerHTML   = `<i class="fas fa-check-circle"></i> ${json.data.name} enrolled successfully!`;
      toast.className   = 'form-toast success';
      e.target.reset();
    } else {
      toast.innerHTML   = `<i class="fas fa-circle-exclamation"></i> ${json.error}`;
      toast.className   = 'form-toast error';
    }
  } catch {
    toast.innerHTML   = '<i class="fas fa-circle-exclamation"></i> Cannot connect to API server.';
    toast.className   = 'form-toast error';
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-plus-circle"></i> Enroll Student';
  setTimeout(() => { toast.className = 'form-toast'; }, 5000);
});

// ── DELETE MODAL ─────────────────────────────────────
let pendingDeleteId = null;

function confirmDelete(id, name) {
  pendingDeleteId = id;
  document.getElementById('modalText').textContent =
    `Permanently remove "${name}" from the database? This action cannot be undone.`;
  document.getElementById('modalOverlay').classList.add('open');
}

document.getElementById('modalCancel').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('open');
  pendingDeleteId = null;
});

document.getElementById('modalConfirm').addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  const btn = document.getElementById('modalConfirm');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting…';
  try {
    await fetch(`${API}/students/${pendingDeleteId}`, { method: 'DELETE' });
    document.getElementById('modalOverlay').classList.remove('open');
    pendingDeleteId = null;
    loadStudents();
  } catch {
    alert('⚠ Could not connect to API.');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
});

// Close modal on backdrop click
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('open');
    pendingDeleteId = null;
  }
});

// ── INIT ─────────────────────────────────────────────
checkAPI();
loadStats();
