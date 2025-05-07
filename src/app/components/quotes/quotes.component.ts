import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quotes-container">
      <div class="quote-card" *ngFor="let quote of quotes; let i = index" [class.active]="i === currentQuoteIndex">
        <p class="quote-text">{{ quote.text }}</p>
        <p class="quote-author">- {{ quote.author }}</p>
      </div>
      <div class="quote-dots">
        <span *ngFor="let quote of quotes; let i = index" 
              [class.active]="i === currentQuoteIndex"
              (click)="setCurrentQuote(i)"></span>
      </div>
    </div>
  `,
  styles: [`
    .quotes-container {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
      text-align: center;
      margin: 2rem 0;
    }

    .quote-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    }

    .quote-card.active {
      opacity: 1;
      transform: translateY(0);
    }

    .quote-text {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      font-style: italic;
      line-height: 1.6;
    }

    .quote-author {
      font-size: 1.1rem;
      color: #34495e;
      font-weight: 500;
    }

    .quote-dots {
      margin-top: 1rem;
    }

    .quote-dots span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #bdc3c7;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .quote-dots span.active {
      background: #3498db;
      transform: scale(1.2);
    }
  `]
})
export class QuotesComponent implements OnInit {
  currentQuoteIndex = 0;
  quotes = [
    {
      text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
      author: "Bill Gates"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    },
    {
      text: "Technology is best when it brings people together.",
      author: "Matt Mullenweg"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    }
  ];

  ngOnInit() {
    this.startQuoteRotation();
  }

  startQuoteRotation() {
    setInterval(() => {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
    }, 5000);
  }

  setCurrentQuote(index: number) {
    this.currentQuoteIndex = index;
  }
} 