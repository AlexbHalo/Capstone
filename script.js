// ==============================
// GLOBAL
// ==============================
const BLANK_MSG = 'Can Not Be Left Blank';

// Helper to get current user
function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

// ==============================
// LOGIN
// ==============================
function login() {
  document.getElementById("loginForm").classList.toggle("hidden");
  document.getElementById("enterBtn").classList.toggle("hidden");
  updateEnterState();
}

function updateEnterState() {
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  const enterBtn = document.getElementById('enterBtn');
  if (!u || !p) return;

  const empty = !u.value || u.value === BLANK_MSG || !p.value || p.value === BLANK_MSG;
  enterBtn.disabled = empty;
}

function clearLoginError() {
  const err = document.getElementById('loginError');
  if (err) err.textContent = '';
}

document.addEventListener('DOMContentLoaded', function(){
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  if (!u || !p) return;

  u.addEventListener('input', updateEnterState);
  p.addEventListener('input', updateEnterState);
  u.addEventListener('input', clearLoginError);
  p.addEventListener('input', clearLoginError);

  [u,p].forEach(el => {
    el.addEventListener('focus', function(){
      if (this.value === BLANK_MSG) {
        this.value = '';
        this.classList.remove('blank');
      }
    });

    el.addEventListener('blur', function(){
      if (!this.value) {
        this.value = BLANK_MSG;
        this.classList.add('blank');
        updateEnterState();
      }
    });
  });
});

function enterSite() {
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  let blocked = false;

  if (!u.value || u.value === BLANK_MSG) {
    u.value = BLANK_MSG;
    u.classList.add('blank');
    blocked = true;
  }

  if (!p.value || p.value === BLANK_MSG) {
    p.value = BLANK_MSG;
    p.classList.add('blank');
    blocked = true;
  }

  if (blocked) return false;

  try {
    const usersRaw = localStorage.getItem('users');
    const users = usersRaw ? JSON.parse(usersRaw) : {};
    const user = users[u.value];

    if (!user || user.password !== p.value) {
      const err = document.getElementById('loginError');
      if (err) err.textContent = 'Invalid username or password';
      return false;
    }

    localStorage.setItem('currentUser', u.value);
  } catch (err) {}

  window.location.href = 'Main.html';
}


// ==============================
// 🎨 USER-SPECIFIC COLORS
// ==============================
function saveCustomColors(colors) {
  const user = getCurrentUser();
  if (!user) return;

  localStorage.setItem(`customColors_${user}`, JSON.stringify(colors));
}

function loadCustomColors() {
  const user = getCurrentUser();
  if (!user) return null;

  const stored = localStorage.getItem(`customColors_${user}`);
  return stored ? JSON.parse(stored) : null;
}

function applyCustomColors(colors) {
  if (!colors) return;

  document.documentElement.style.setProperty('--bg-primary', colors.base);
  document.documentElement.style.setProperty('--accent-color', colors.primary);
  document.documentElement.style.setProperty('--bg-secondary', colors.sub);
}


// ==============================
// 🌙 USER-SPECIFIC THEME
// ==============================
function saveTheme(theme) {
  const user = getCurrentUser();
  if (!user) return;

  localStorage.setItem(`theme_${user}`, theme);
}

function loadTheme() {
  const user = getCurrentUser();
  if (!user) return 'dark';

  return localStorage.getItem(`theme_${user}`) || 'dark';
}


// ==============================
// 📝 USER-SPECIFIC WORKLOGS
// ==============================
function getWorkSessions() {
  const user = getCurrentUser();
  if (!user) return [];

  const raw = localStorage.getItem(`workSessions_${user}`);
  return raw ? JSON.parse(raw) : [];
}

function saveWorkSessions(sessions) {
  const user = getCurrentUser();
  if (!user) return;

  localStorage.setItem(`workSessions_${user}`, JSON.stringify(sessions));
}

function addWorkSession(session) {
  const sessions = getWorkSessions();
  sessions.push(session);
  saveWorkSessions(sessions);
}


// ==============================
// ⏱ OPTIONAL: SAVE TIMER SETTINGS PER USER
// ==============================
function saveTimerSettings(workMinutes, breakMinutes) {
  const user = getCurrentUser();
  if (!user) return;

  localStorage.setItem(`workMinutes_${user}`, workMinutes);
  localStorage.setItem(`breakMinutes_${user}`, breakMinutes);
}

function loadTimerSettings() {
  const user = getCurrentUser();
  if (!user) return { work: 25, break: 5 };

  return {
    work: parseInt(localStorage.getItem(`workMinutes_${user}`)) || 25,
    break: parseInt(localStorage.getItem(`breakMinutes_${user}`)) || 5
  };
}