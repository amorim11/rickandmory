import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RickMortyApiService } from '../../core/services/rick-morty-api.service';
import { SearchService } from '../../core/services/seach.service';
import { Character } from '../../core/models/api.model';

@Component({
  selector: 'characters-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, SearchBarComponent],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
 characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = signal<number>(1);
  hasMore = signal<boolean>(true);
  private searchSubject = new Subject<string>();

  constructor(
    private apiService: RickMortyApiService,
    private searchService: SearchService
  ) {
    effect(() => {
      const searchTerm = this.searchService.searchTerm();
      this.searchSubject.next(searchTerm);
    });
  }

  ngOnInit(): void {
    this.loadCharacters();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndLoad();
    });
  }

  loadCharacters(): void {
    this.loading.set(true);
    this.error.set('');

    this.apiService.getCharacters(this.currentPage(), this.searchService.searchTerm())
      .subscribe({
        next: (response) => {
          this.characters.update(chars => [...chars, ...response.results]);
          this.hasMore.set(!!response.info.next);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load characters. Please try again.');
          this.loading.set(false);
          this.hasMore.set(false);
        }
      });
  }

  loadMoreCharacters(): void {
    if (!this.loading() && this.hasMore()) {
      this.currentPage.update(page => page + 1);
      this.loadCharacters();
    }
  }

  private resetAndLoad(): void {
    this.characters.set([]);
    this.currentPage.set(1);
    this.hasMore.set(true);
    this.loadCharacters();
  }
}
