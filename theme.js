function loadTheme() {
  return getUserData('theme', 'dark');
}

function saveTheme(theme) {
  setUserData('theme', theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function loadColors() {
  return getUserData('customColors');
}

function saveColors(colors) {
  setUserData('customColors', colors);
}

function applyColors(colors) {
  if (!colors) return;

  document.documentElement.style.setProperty('--bg-primary', colors.base);
  document.documentElement.style.setProperty('--accent-color', colors.primary);
  document.documentElement.style.setProperty('--bg-secondary', colors.sub);
}