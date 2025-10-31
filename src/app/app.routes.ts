import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'characters', pathMatch: 'full' },
      {
        path: 'characters',
        loadComponent: () =>
          import('./features/characters/characters.component').then(m => m.CharactersComponent)
      },
      {
        path: 'locations',
        loadComponent: () =>
          import('./features/locations/locations.component').then(m => m.LocationsComponent)
      },
      {
        path: 'episodes',
        loadComponent: () =>
          import('./features/episodes/episodes.component').then(m => m.EpisodesComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/Auth/auth.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: 'characters'
  }
];
