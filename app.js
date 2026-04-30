function getSessions() {
  return getUserData('workSessions', []);
}

function addSession(session) {
  const sessions = getSessions();
  sessions.push(session);
  setUserData('workSessions', sessions);
}