import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'characters-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, HeaderComponent, CommonModule],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe({
        next: (response) => {
          this.characters = response.results;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Erro ao carregar personagens 😢';
          this.isLoading = false;
        }
      });
  }
}
