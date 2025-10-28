import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class LoginComponent {
  title = 'projeto-rickandmory';
  errorMessage = signal<string>('');

  constructor(
    private router: Router
  ) {}

  onSubmit(): void {
    if (this) {
      const success = this;
      if (success) {
        this.router.navigate(['/characters']);
      } else {
        this
      }
    }
  }
}


