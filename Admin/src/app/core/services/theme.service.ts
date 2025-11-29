import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'steex-theme-mode';

  constructor() {
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'dark';
    this.applyTheme(savedTheme);
  }

  applyTheme(theme: string) {
    localStorage.setItem(this.THEME_KEY, theme);
    
    // Aplica al html
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-layout-mode', theme);
    htmlElement.setAttribute('data-bs-theme', theme);
    htmlElement.setAttribute('data-theme', theme);
    
    // Agrega o quita clase dark
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }

  setDarkMode() {
    this.applyTheme('dark');
  }

  setLightMode() {
    this.applyTheme('light');
  }

  toggleTheme() {
    const current = localStorage.getItem(this.THEME_KEY) || 'light';
    this.applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  getCurrentTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || 'dark';
  }
}