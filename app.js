function addWorkSession(session) {
  const sessions = getSessions();
  sessions.push(session);
  setUserData('workSessions', sessions);
}

function getSessions() {
  const data = getUserData('workSessions', []);
  return Array.isArray(data) ? data : [];
}