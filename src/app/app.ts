import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraNavComponent } from './components/barra-nav/barra-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto_aula');
}
