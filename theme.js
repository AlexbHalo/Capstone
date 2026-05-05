function initTheme(){

  const themeToggle = document.getElementById('themeToggle');
  const customModeBtn = document.getElementById('customModeBtn');
  const customModeDialog = document.getElementById('customModeDialog');
  const customModeOverlay = document.getElementById('customModeOverlay');

  const customBaseColor = document.getElementById('customBaseColor');
  const customPrimaryColor = document.getElementById('customPrimaryColor');
  const customSubColor = document.getElementById('customSubColor');

  const saveBtn = document.getElementById('saveCustomMode');
  const cancelBtn = document.getElementById('cancelCustomMode');
  const resetBtn = document.getElementById('resetCustomMode');

  // =====================
  // LOAD THEME
  // =====================
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle){
    themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  // =====================
  // LOAD CUSTOM COLORS
  // =====================
  function applyColors(colors){
    if (!colors) return;

    document.documentElement.style.setProperty('--bg-primary', colors.base);
    document.documentElement.style.setProperty('--accent-color', colors.primary);
    document.documentElement.style.setProperty('--bg-secondary', colors.sub);
  }

  let customColors = null;

  try {
    const stored = localStorage.getItem('customColors');
    if (stored){
      customColors = JSON.parse(stored);
      applyColors(customColors);
    }
  } catch(e){}

  // =====================
  // TOGGLE LIGHT/DARK
  // =====================
  if (themeToggle){
    themeToggle.addEventListener('click', function(){
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      themeToggle.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';

      if (customColors) applyColors(customColors);
    });
  }

  // =====================
  // OPEN CUSTOM PANEL
  // =====================
  if (customModeBtn){
    customModeBtn.addEventListener('click', function(){
      if (!customModeDialog || !customModeOverlay) return;

      customModeDialog.style.display = 'block';
      customModeOverlay.style.display = 'block';

      const styles = getComputedStyle(document.documentElement);

      customBaseColor.value = styles.getPropertyValue('--bg-primary').trim();
      customPrimaryColor.value = styles.getPropertyValue('--accent-color').trim();
      customSubColor.value = styles.getPropertyValue('--bg-secondary').trim();
    });
  }

  function closeDialog(){
    if (customModeDialog) customModeDialog.style.display = 'none';
    if (customModeOverlay) customModeOverlay.style.display = 'none';
  }

  // =====================
  // SAVE CUSTOM COLORS
  // =====================
  if (saveBtn){
    saveBtn.addEventListener('click', function(){

      customColors = {
        base: customBaseColor.value,
        primary: customPrimaryColor.value,
        sub: customSubColor.value
      };

      localStorage.setItem('customColors', JSON.stringify(customColors));
      applyColors(customColors);

      closeDialog();
    });
  }

  // =====================
  // RESET
  // =====================
  if (resetBtn){
    resetBtn.addEventListener('click', function(){

      localStorage.removeItem('customColors');
      customColors = null;

      document.documentElement.style.removeProperty('--bg-primary');
      document.documentElement.style.removeProperty('--accent-color');
      document.documentElement.style.removeProperty('--bg-secondary');

      closeDialog();
    });
  }

  // =====================
  // CANCEL / OVERLAY
  // =====================
  if (cancelBtn) cancelBtn.addEventListener('click', closeDialog);
  if (customModeOverlay) customModeOverlay.addEventListener('click', closeDialog);
}