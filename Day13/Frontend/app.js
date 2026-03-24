// ══════════════════════════════════════════
//   app.js — Student Dashboard Logic
//   Day13: Improved Frontend
// ══════════════════════════════════════════

const API = 'http://localhost:3000';

// ── PAGE NAVIGATION ─────────────────────
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

    // close sidebar on mobile
    if (window.innerWidth < 769) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

// Sidebar toggle (mobile)
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── API STATUS ────────────────────────
async function checkAPI() {
  try {
    await fetch(`${API}/`);
    const dot   = document.querySelector('.api-status .dot');
    const label = document.querySelector('.api-status span:last-child');
    dot.classList.replace('offline', 'online');
    label.textContent = 'API Online';
  } catch { /* stays offline */ }
}

// ── GRADE HELPER ─────────────────────
function getGrade(marks) {
  if (marks >= 90) return { label: 'A+', cls: 'grade-A' };
  if (marks >= 75) return { label: 'A',  cls: 'grade-A' };
  if (marks >= 60) return { label: 'B',  cls: 'grade-B' };
  if (marks >= 45) return { label: 'C',  cls: 'grade-C' };
  return { label: 'D', cls: 'grade-D' };
}

// ── DASHBOARD STATS ───────────────────
async function loadStats() {
  try {
    const res  = await fetch(`${API}/students/stats`);
    const json = await res.json();
    const d    = json.data;

    document.getElementById('totalStudents').textContent = d.total;
    document.getElementById('avgMarks').textContent      = d.averageMarks;
    document.getElementById('topStudent').textContent    = d.topStudent;
    document.getElementById('highestMarks').textContent  = d.highestMarks;

    const max  = Math.max(...Object.values(d.byBranch));
    const list = document.getElementById('branchList');
    list.innerHTML = Object.entries(d.byBranch).map(([branch, count]) => `
      <div class="branch-row">
        <span class="branch-name">${branch}</span>
        <span class="branch-count">${count}</span>
        <div class="branch-bar-wrap">
          <div class="branch-bar" style="width:${(count / max) * 100}%"></div>
        </div>
      </div>
    `).join('');
  } catch {
    document.getElementById('branchList').innerHTML =
      '<p class="loading-text" style="color:#ef4444">⚠ Could not connect to API. Start the backend server.</p>';
  }
}

// ── STUDENTS TABLE ────────────────────
async function loadStudents() {
  const tbody   = document.getElementById('studentTableBody');
  const search  = document.getElementById('searchInput').value.trim();
  const year    = document.getElementById('filterYear').value;
  const sortVal = document.getElementById('sortBy').value;

  tbody.innerHTML = `<tr><td colspan="7" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>`;

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

    // client-side search by name/branch
    if (search) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">😕 No students found</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map(s => {
      const g = getGrade(s.marks);
      return `
        <tr>
          <td><span style="color:var(--muted)">#${s.id}</span></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.branch}</td>
          <td>Year ${s.year}</td>
          <td><strong>${s.marks}</strong>/100</td>
          <td><span class="grade-badge ${g.cls}">${g.label}</span></td>
          <td>
            <button class="btn-icon" onclick="confirmDelete(${s.id},'${s.name}')" title="Delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch {
    tbody.innerHTML = `<tr><td colspan="7" class="loading-cell" style="color:#ef4444">⚠ Could not reach API. Is the server running?</td></tr>`;
  }
}

// live search/filter
document.getElementById('searchInput').addEventListener('input', loadStudents);
document.getElementById('filterYear').addEventListener('change', loadStudents);
document.getElementById('sortBy').addEventListener('change', loadStudents);

// ── ADD STUDENT FORM ──────────────────
document.getElementById('addStudentForm').addEventListener('submit', async e => {
  e.preventDefault();
  const toast  = document.getElementById('formToast');
  const name   = document.getElementById('newName').value.trim();
  const branch = document.getElementById('newBranch').value;
  const year   = document.getElementById('newYear').value;
  const marks  = document.getElementById('newMarks').value;

  toast.className   = 'form-toast';
  toast.textContent = '';

  try {
    const res  = await fetch(`${API}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, branch, year: parseInt(year), marks: parseInt(marks) })
    });
    const json = await res.json();

    if (json.success) {
      toast.textContent = `✅ ${json.data.name} added successfully!`;
      toast.className   = 'form-toast success';
      e.target.reset();
    } else {
      toast.textContent = `❌ ${json.error}`;
      toast.className   = 'form-toast error';
    }
  } catch {
    toast.textContent = '❌ Cannot connect to API server.';
    toast.className   = 'form-toast error';
  }

  setTimeout(() => { toast.className = 'form-toast'; }, 4000);
});

// ── DELETE MODAL ──────────────────────
let pendingDeleteId = null;

function confirmDelete(id, name) {
  pendingDeleteId = id;
  document.getElementById('modalText').textContent = `Delete "${name}" permanently?`;
  document.getElementById('modalOverlay').classList.add('open');
}

document.getElementById('modalCancel').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('open');
  pendingDeleteId = null;
});

document.getElementById('modalConfirm').addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  try {
    await fetch(`${API}/students/${pendingDeleteId}`, { method: 'DELETE' });
    document.getElementById('modalOverlay').classList.remove('open');
    pendingDeleteId = null;
    loadStudents();
  } catch {
    alert('⚠ Could not connect to API.');
  }
});

// close modal on background click
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('open');
    pendingDeleteId = null;
  }
});

// ── INIT ─────────────────────────────
checkAPI();
loadStats();
