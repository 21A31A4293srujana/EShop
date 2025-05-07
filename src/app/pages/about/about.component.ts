import { Component, OnInit, HostListener } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    AOS.init({
      duration: 800,
      once: true
    });
    this.animateNumbers();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateProgressBar();
  }

  private updateProgressBar() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressFill = document.querySelector('.progress-fill') as HTMLElement;
    if (progressFill) {
      progressFill.style.width = scrolled + '%';
    }
  }

  private animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count') || '0');
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateNumber = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target.toString();
        }
      };

      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateNumber();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(stat);
    });
  }

  // Handle showcase button clicks
  onShowcaseClick(type: string) {
    switch(type) {
      case 'learn':
        // Handle learn more click
        console.log('Learn more clicked');
        break;
      case 'watch':
        // Handle watch video click
        console.log('Watch video clicked');
        break;
    }
  }
}
