import { Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { SearchService, SearchResultWithMatches } from '../../services/search/search.service';
import { FuseResultMatch } from 'fuse.js';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [CommonModule, FormsModule]
})
export class SearchBarComponent implements OnInit {
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() clickSearch = new EventEmitter<string>();
  
  suggestions: (SearchResultWithMatches<Product> | string)[] = [];
  showSuggestions: boolean = false;
  selectedIndex: number = -1;
  private searchHistory: string[] = [];

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadSearchHistory();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }

  onSearch(): void {
    if (this.search.trim()) {
      this.addToSearchHistory(this.search);
      this.clickSearch.emit(this.search);
      this.router.navigate(['/search'], { queryParams: { q: this.search } });
    }
  }

  onInput(): void {
    this.searchChange.emit(this.search);
    if (this.search.trim()) {
      const products = this.productService.searchProducts(this.search);
      const productSuggestions = this.searchService.fuzzySearch(
        products,
        this.search,
        ['name', 'description', 'category', 'brand']
      ) as SearchResultWithMatches<Product>[];
      
      const historySuggestions = this.getSearchHistory()
        .filter(term => term.toLowerCase().includes(this.search.toLowerCase()));
      
      this.suggestions = [...productSuggestions, ...historySuggestions];
      this.showSuggestions = true;
      this.selectedIndex = -1;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      event.preventDefault();
      this.selectSuggestion(this.suggestions[this.selectedIndex]);
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: SearchResultWithMatches<Product> | string): void {
    if (typeof suggestion === 'string') {
      this.search = suggestion;
      this.onSearch();
    } else {
      this.search = suggestion.item.name;
      this.showSuggestions = false;
      this.router.navigate(['/product', suggestion.item.id]);
    }
  }

  getHighlightedText(text: string, matches: FuseResultMatch[]): string {
    if (!matches || matches.length === 0) return text;
    
    const indices = matches.flatMap(match => match.indices);
    let result = '';
    let lastIndex = 0;

    indices.sort((a, b) => a[0] - b[0]);

    for (const [start, end] of indices) {
      result += text.substring(lastIndex, start);
      result += `<span class="highlight">${text.substring(start, end + 1)}</span>`;
      lastIndex = end + 1;
    }

    result += text.substring(lastIndex);
    return result;
  }

  private loadSearchHistory(): void {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory = JSON.parse(history);
    }
  }

  private getSearchHistory(): string[] {
    return this.searchHistory || [];
  }

  private addToSearchHistory(term: string): void {
    if (!this.searchHistory) {
      this.searchHistory = [];
    }
    this.searchHistory = [term, ...this.searchHistory.filter(item => item !== term)]
      .slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  clearHistory(): void {
    this.searchHistory = [];
    localStorage.removeItem('searchHistory');
  }

  isHistorySuggestion(suggestion: SearchResultWithMatches<Product> | string): suggestion is string {
    return typeof suggestion === 'string';
  }

  isProductSuggestion(suggestion: SearchResultWithMatches<Product> | string): suggestion is SearchResultWithMatches<Product> {
    return typeof suggestion !== 'string' && 'item' in suggestion;
  }

  hasHistorySuggestions(): boolean {
    return this.suggestions.some(s => this.isHistorySuggestion(s));
  }
}

