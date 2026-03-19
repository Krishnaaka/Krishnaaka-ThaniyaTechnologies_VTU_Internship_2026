// ══════════════════════════════════════════
//   CricketIQ — App Logic
// ══════════════════════════════════════════

/* ── 1. NAVBAR SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateNavLinks();
});

/* ── 2. ACTIVE NAV LINK ON SCROLL ── */
function updateNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ── 3. COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hstat-num').forEach(el => counterObserver.observe(el));

/* ── 4. SCROLL REVEAL ANIMATION ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animation = 'fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.score-card, .player-card, .chart-card, .table-wrap').forEach(el => {
  el.style.opacity = '1';
  revealObserver.observe(el);
});

/* ── 5. HERO PARALLAX PARTICLES ── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  const COLORS = ['#22c55e', '#38bdf8', '#f97316', '#8b5cf6', '#fff'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const dur = Math.random() * 16 + 10;
    const delay = Math.random() * 14;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;bottom:-10px;
      background:${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(p);
  }
})();

/* ── 6. TAB SWITCHING ── */
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateCharts(tab.dataset.tab);
  });
});

/* ── 7. CHARTS ── */
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: { color: '#94a3b8', font: { family: 'Outfit', size: 12 }, boxWidth: 12 }
    }
  },
  scales: {}
};

// Chart Color Helper
const alpha = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2,'0');

// RUN RATE CHART
const rrCtx = document.getElementById('runRateChart').getContext('2d');
const runRateChart = new Chart(rrCtx, {
  type: 'line',
  data: {
    labels: ['P1','P6','P10','P15','P20'],
    datasets: [
      {
        label: 'India',
        data: [6.2, 7.8, 9.1, 10.4, 9.3],
        borderColor: '#f97316',
        backgroundColor: alpha('#f97316', 0.15),
        tension: 0.45,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#f97316'
      },
      {
        label: 'England',
        data: [5.5, 6.9, 8.0, 9.5, 8.2],
        borderColor: '#38bdf8',
        backgroundColor: alpha('#38bdf8', 0.10),
        tension: 0.45,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#38bdf8'
      }
    ]
  },
  options: {
    ...chartDefaults,
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' } }
    }
  }
});

// WIN DISTRIBUTION CHART
const winCtx = document.getElementById('winChart').getContext('2d');
const winChart = new Chart(winCtx, {
  type: 'doughnut',
  data: {
    labels: ['India','Australia','England','Pakistan','Others'],
    datasets: [{
      data: [28, 22, 18, 14, 18],
      backgroundColor: ['#f97316','#eab308','#38bdf8','#22c55e','#8b5cf6'],
      borderColor: 'rgba(5,8,15,0.8)',
      borderWidth: 2,
      hoverOffset: 8
    }]
  },
  options: {
    ...chartDefaults,
    cutout: '65%',
    plugins: {
      legend: { position: 'right', labels: { color: '#94a3b8', font: { family:'Outfit',size:11 }, boxWidth: 10 } }
    }
  }
});

// BATTING AVERAGE CHART
const avgCtx = document.getElementById('avgChart').getContext('2d');
const avgChart = new Chart(avgCtx, {
  type: 'bar',
  data: {
    labels: ['India','Australia','England','Pakistan','New Zealand','S. Africa'],
    datasets: [{
      label: 'Batting Average',
      data: [52.4, 48.7, 46.3, 44.9, 41.2, 43.5],
      backgroundColor: [
        alpha('#f97316',0.85),
        alpha('#eab308',0.85),
        alpha('#38bdf8',0.85),
        alpha('#22c55e',0.85),
        alpha('#8b5cf6',0.85),
        alpha('#ec4899',0.85)
      ],
      borderRadius: 8,
      borderSkipped: false
    }]
  },
  options: {
    ...chartDefaults,
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' }, beginAtZero: true }
    }
  }
});

// Update charts on tab switch
function updateCharts(tab) {
  const datasets = {
    batting: {
      rr: [[6.2,7.8,9.1,10.4,9.3],[5.5,6.9,8.0,9.5,8.2]],
      avg: [52.4,48.7,46.3,44.9,41.2,43.5],
      avgLabel: 'Batting Average',
      win: [28,22,18,14,18]
    },
    bowling: {
      rr: [[8.1,7.4,6.7,6.1,7.0],[8.8,7.9,6.5,5.8,7.5]],
      avg: [28.1,30.4,32.7,31.9,27.5,33.2],
      avgLabel: 'Bowling Economy',
      win: [24,25,17,16,18]
    },
    fielding: {
      rr: [[5,8,12,15,18],[4,7,10,14,16]],
      avg: [92,88,84,80,76,82],
      avgLabel: 'Fielding Efficiency %',
      win: [22,23,19,18,18]
    }
  };
  const d = datasets[tab];
  runRateChart.data.datasets[0].data = d.rr[0];
  runRateChart.data.datasets[1].data = d.rr[1];
  runRateChart.update('active');
  avgChart.data.datasets[0].data = d.avg;
  avgChart.data.datasets[0].label = d.avgLabel;
  avgChart.update('active');
  winChart.data.datasets[0].data = d.win;
  winChart.update('active');
}

/* ── 8. LIVE SCORE TICKER ── */
(function liveScoreTicker() {
  let runs = 187, wickets = 4, balls = 111; // 18.3 ov
  setInterval(() => {
    const rand = Math.random();
    if (rand < 0.05 && wickets < 10) { wickets++; balls++; }
    else if (rand < 0.15) { runs += 6; balls++; }
    else if (rand < 0.40) { runs += 4; balls++; }
    else { runs += Math.floor(Math.random() * 3) + 1; balls++; }
    const overs = Math.floor(balls / 6);
    const b = balls % 6;
    if (overs >= 20) return;
    const el = document.getElementById('ind-score');
    if (el) el.textContent = `${runs}/${wickets}`;
  }, 3500);
})();

/* ── 9. SMOOTH SCROLL FOR NAV BUTTONS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── 10. HAMBURGER (MOBILE) ── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '70px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'rgba(5,8,15,0.97)';
  links.style.padding = '1.5rem';
  links.style.gap = '1.5rem';
  links.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
});

console.log('%cCricketIQ Analytics 🏏', 'color:#22c55e;font-size:20px;font-weight:700;');
console.log('%cBuilt for cricket lovers ⚡', 'color:#38bdf8;font-size:13px;');
