import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-hero',
  imports: [SocialLinksComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  joinedDate = new Date('2021-01-01');
  experience = this.getYearsWithDecimal(this.joinedDate);

  getYearsWithDecimal(startDate: Date, endDate: Date = new Date()): string {
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const days = endDate.getDate() - startDate.getDate();

    // Adjust months/years if needed
    let totalMonths = years * 12 + months;
    if (days < 0) {
      totalMonths -= 1; // if not full month
    }

    const finalYears = totalMonths / 12;
    return finalYears.toFixed(1); // one decimal place
  }

  navigateToSection(): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  downloadResume(): void {
    window.open(
      'https://drive.google.com/uc?export=download&id=19HVMVvsjp8QodpGJyC-jn5SH7_9lNaeT',
      '_blank'
    );
  }
}
