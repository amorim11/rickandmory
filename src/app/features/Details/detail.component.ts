import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'detail-root',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class detailComponent {
  title = 'projeto-rickandmory';
}