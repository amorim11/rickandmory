import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { SearchService } from '../../../core/services/seach.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchTerm = '';

  constructor(private searchService: SearchService) {
    effect(() => {
      const term = this.searchService.searchTerm();
      if (!term) {
        this.searchTerm = '';
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchService.setSearchTerm(term);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchService.clearSearch();
  }

}
