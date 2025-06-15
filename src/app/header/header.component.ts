import { Component, Renderer2, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  theme: 'light' | 'dark' = 'dark';
  isMobileMenuOpen = false;
  activeSection = 'about';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Check if we're in a browser environment before using localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      this.theme = savedTheme || 'dark';
    }
    this.updateTheme();
    this.setupScrollListener();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.updateTheme();

    // Save to localStorage only if available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', this.theme);
    }
  }

  updateTheme(): void {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;

      // Remove both classes first to ensure clean state
      this.renderer.removeClass(html, 'light');
      this.renderer.removeClass(html, 'dark');

      // Add the current theme class
      this.renderer.addClass(html, this.theme);

      console.log('Theme updated. HTML classes:', html.className);
    }
  }

  // Mobile menu functionality
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Navigation functionality
  navigateToSection(sectionId: string): void {
    this.activeSection = sectionId;
    this.closeMobileMenu();

    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  // Setup scroll listener for active section detection
  private setupScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (typeof document === 'undefined') return;

    const sections = ['about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header height

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }
}
