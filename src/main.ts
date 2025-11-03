import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { Component, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet />',
  imports: [RouterOutlet]
})
export class App {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
  
});
