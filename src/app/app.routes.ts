import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Auth/auth.component';
import { charactersComponent } from './pages/characters/characters.component'

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, //rota inicial

    {path: 'characters', component: charactersComponent },
];


