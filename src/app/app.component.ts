import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-wrapper">
      <nav class="navbar">
        <a routerLink="/" class="logo-link">
          <img src="assets/cic-logo.png" alt="CiC Support" class="logo-img">
        </a>
        <button (click)="toggleTheme()" class="theme-btn" [attr.aria-label]="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'">
          {{ isDarkTheme ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .logo-img { 
      height: 40px;
      width: auto;
      transition: transform 0.2s;
    }
    .logo-link:hover .logo-img {
      transform: scale(1.05);
    }
    .theme-btn {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      color: var(--text-color);
      font-weight: 600;
      transition: all 0.2s;
    }
    .theme-btn:hover {
      background: var(--primary-light);
      color: var(--primary-dark);
    }
    .app-wrapper {
      min-height: 100vh;
      background: var(--bg-color);
      color: var(--text-color);
      transition: background 0.3s, color 0.3s;
    }
    main { padding-top: 0; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
