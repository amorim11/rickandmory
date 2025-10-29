import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class LoginComponent {
  title = 'projeto-rickandmory';
  errorMessage = signal<string>('');

  constructor(
    private router: Router
  ) {}
}


