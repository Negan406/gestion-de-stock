import React, { useState, useEffect } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <label className="theme-switch mb-2">
      <input
        type="checkbox"
        id="themeSwitch"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider"></span>
    </label>
  );
}

export default ThemeSwitcher;
