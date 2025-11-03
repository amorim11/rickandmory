import { Component, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RickMortyApiService } from '../../core/services/rick-morty-api.service';
import { SearchService } from '../../core/services/seach.service';
import { Episode } from '../../core/models/api.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";


@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [RouterModule, SearchBarComponent], 
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent {
  episodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = signal<number>(1);
  hasMore = signal<boolean>(true);
  selectedEpisode = signal<Episode | null>(null);
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
    this.loadEpisodes();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndLoad();
    });
  }

  loadEpisodes(): void {
    this.loading.set(true);
    this.error.set('');

    this.apiService.getEpisodes(this.currentPage(), this.searchService.searchTerm())
      .subscribe({
        next: (response) => {
          this.episodes.update(eps => [...eps, ...response.results]);
          this.hasMore.set(!!response.info.next);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load episodes. Please try again.');
          this.loading.set(false);
          this.hasMore.set(false);
        }
      });
  }

  loadMoreEpisodes(): void {
    if (!this.loading() && this.hasMore()) {
      this.currentPage.update(page => page + 1);
      this.loadEpisodes();
    }
  }

  showDetails(episode: Episode): void {
    this.selectedEpisode.set(episode);
  }

  closeDetails(): void {
    this.selectedEpisode.set(null);
  }

  private resetAndLoad(): void {
    this.episodes.set([]);
    this.currentPage.set(1);
    this.hasMore.set(true);
    this.loadEpisodes();
  }
}


