import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guards';
import { LoginComponent } from './features/Auth/auth.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/Auth/auth.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
      },
      {
        path: 'characters',
        loadComponent: () => import('./features/characters/characters.component').then(m => m.CharactersComponent)
      },
      {
        path: 'characters/:id',
        loadComponent: () => import('./features/characters/characters-detail/character-detail.component').then(m => m.CharacterDetailComponent)
      },
      {
        path: 'locations',
        loadComponent: () => import('./features/locations/locations.component').then(m => m.LocationsComponent)
      },
      {
        path: 'episodes',
        loadComponent: () => import('./features/episodes/episodes.component').then(m => m.EpisodesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'characters'
  }
];