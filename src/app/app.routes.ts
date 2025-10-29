import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Auth/auth.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { detailComponent } from './pages/Details/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'detail', component: detailComponent },
];
