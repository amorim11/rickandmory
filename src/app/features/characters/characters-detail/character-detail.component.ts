import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RickMortyApiService } from '../../../core/services/rick-morty-api.service';
import { Character } from '../../../core/models/api.model';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {
  character = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private apiService: RickMortyApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacter(+id);
    }
  }

  loadCharacter(id: number): void {
    this.loading.set(true);
    this.error.set('');

    this.apiService.getCharacter(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load character details.');
        this.loading.set(false);
      }
    });
  }
}