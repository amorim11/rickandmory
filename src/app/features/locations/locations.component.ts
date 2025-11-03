import { Component, signal, OnInit, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RickMortyApiService } from '../../core/services/rick-morty-api.service';
import { SearchService } from '../../core/services/seach.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AppLocation } from '../../core/models/api.model';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterModule, SearchBarComponent, HttpClientModule], 
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit {
  locations = signal<AppLocation[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = signal<number>(1);
  hasMore = signal<boolean>(true);
  selectedLocation = signal<AppLocation | null>(null);
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
    this.loadLocations();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndLoad();
    });
  }

  loadLocations(): void {
    this.loading.set(true);
    this.error.set('');

    this.apiService.getLocations(this.currentPage(), this.searchService.searchTerm())
      .subscribe({
        next: (response) => {
          this.locations.update(locs => [...locs, ...response.results]);
          this.hasMore.set(!!response.info.next);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load locations. Please try again.');
          this.loading.set(false);
          this.hasMore.set(false);
        }
      });
  }

  loadMoreLocations(): void {
    if (!this.loading() && this.hasMore()) {
      this.currentPage.update(page => page + 1);
      this.loadLocations();
    }
  }

  showDetails(location: AppLocation): void {
    this.selectedLocation.set(location);
  }

  closeDetails(): void {
    this.selectedLocation.set(null);
  }

  private resetAndLoad(): void {
    this.locations.set([]);
    this.currentPage.set(1);
    this.hasMore.set(true);
    this.loadLocations();
  }
}


