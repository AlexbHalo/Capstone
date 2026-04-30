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