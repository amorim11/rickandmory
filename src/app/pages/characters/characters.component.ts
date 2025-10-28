import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'characters-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class charactersComponent {
  title = 'projeto-rickandmory';
}


