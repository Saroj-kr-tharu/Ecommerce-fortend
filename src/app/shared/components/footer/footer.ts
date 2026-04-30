import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer  {
  currentYear = signal(new Date().getFullYear())
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
  const cards = document.querySelectorAll('.chart-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
}
  

}
