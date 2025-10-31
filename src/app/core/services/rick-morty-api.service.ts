import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Character, Location, Episode } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1, name: string = ''): Observable<ApiResponse<Character>> {
    const params: any = { page };
    if (name) params.name = name;
    return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/character`, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getLocations(page: number = 1, name: string = ''): Observable<ApiResponse<Location>> {
    const params: any = { page };
    if (name) params.name = name;
    return this.http.get<ApiResponse<Location>>(`${this.baseUrl}/location`, { params });
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`);
  }

  getEpisodes(page: number = 1, name: string = ''): Observable<ApiResponse<Episode>> {
    const params: any = { page };
    if (name) params.name = name;
    return this.http.get<ApiResponse<Episode>>(`${this.baseUrl}/episode`, { params });
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }
}
