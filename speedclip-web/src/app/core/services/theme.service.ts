import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeName } from '../../shared/constants/design-tokens';

const STORAGE_KEY = 'sc_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');
  private currentTheme: ThemeName = 'light';
  readonly theme$ = new BehaviorSubject<ThemeName>('light');

  constructor() {
    this.init();
  }

  private init() {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeName | null);
    const os: ThemeName = this.prefersDark?.matches ? 'dark' : 'light';
    this.setTheme(saved ?? os, false);

    if (this.prefersDark) {
      this.prefersDark.addEventListener('change', (e) => {
        const savedExplicit = localStorage.getItem(STORAGE_KEY);
        if (!savedExplicit) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  get theme(): ThemeName { return this.currentTheme; }

  setTheme(theme: ThemeName, persist: boolean = true) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    if (persist) localStorage.setItem(STORAGE_KEY, theme);
    this.theme$.next(theme);
  }

  toggle() {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}

