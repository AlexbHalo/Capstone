function getUser() {
  return localStorage.getItem('currentUser');
}

function getUserData(key, defaultValue = null) {
  const user = getUser();
  if (!user) return defaultValue;

  const raw = localStorage.getItem(`${key}_${user}`);
  return raw ? JSON.parse(raw) : defaultValue;
}

function setUserData(key, value) {
  const user = getUser();
  if (!user) return;

  localStorage.setItem(`${key}_${user}`, JSON.stringify(value));
}

function getWorkSessions(){
  const user = localStorage.getItem('currentUser');
  const raw = localStorage.getItem(`workSessions_${user}`);
  return raw ? JSON.parse(raw) : [];
}

function saveWorkSessions(sessions){
  const user = localStorage.getItem('currentUser');
  localStorage.setItem(`workSessions_${user}`, JSON.stringify(sessions));
}

function addWorkSession(session){
  const sessions = getWorkSessions();
  sessions.push(session);
  saveWorkSessions(sessions);
}