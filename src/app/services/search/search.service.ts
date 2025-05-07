import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Fuse, { FuseResult, FuseResultMatch } from 'fuse.js';

export interface SearchResultWithMatches<T> {
  item: T;
  matches: FuseResultMatch[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  private searchHistorySubject = new BehaviorSubject<string[]>([]);
  private searchDebouncer = new Subject<string>();
  
  searchQuery$ = this.searchQuerySubject.asObservable();
  searchHistory$ = this.searchHistorySubject.asObservable();
  
  private readonly MAX_HISTORY_ITEMS = 5;
  private readonly DEBOUNCE_TIME = 300; // milliseconds

  constructor() {
    // Initialize search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      this.searchHistorySubject.next(JSON.parse(savedHistory));
    }

    // Setup debounced search
    this.searchDebouncer.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuerySubject.next(query);
    });
  }

  setSearchQuery(query: string) {
    this.searchDebouncer.next(query);
    
    // Add to search history if not empty
    if (query.trim()) {
      this.addToSearchHistory(query);
    }
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }

  private addToSearchHistory(query: string) {
    const currentHistory = this.searchHistorySubject.value;
    const newHistory = [query, ...currentHistory.filter(item => item !== query)]
      .slice(0, this.MAX_HISTORY_ITEMS);
    
    this.searchHistorySubject.next(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }

  clearSearchHistory() {
    this.searchHistorySubject.next([]);
    localStorage.removeItem('searchHistory');
  }

  // Fuzzy search implementation
  fuzzySearch<T>(items: T[], searchTerm: string, keys: string[]): SearchResultWithMatches<T>[] {
    if (!searchTerm.trim()) return items.map(item => ({ item, matches: [] }));

    const fuse = new Fuse(items, {
      keys: keys,
      threshold: 0.2, // Lower threshold for more precise matches
      distance: 50, // Lower distance for more precise matches
      includeMatches: true,
      minMatchCharLength: 2, // Minimum characters that must match
      ignoreLocation: false, // Consider location of matches
      useExtendedSearch: true, // Enable extended search features
      shouldSort: true // Sort results by relevance
    });

    return fuse.search(searchTerm).map(result => ({
      item: result.item,
      matches: result.matches ? [...result.matches] : []
    }));
  }
} 