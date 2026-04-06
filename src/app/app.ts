import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraNavComponent } from './components/barra-nav/barra-nav.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraNavComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto_aula');

  constructor(private router: Router) {}

  isCadastro(): boolean {
    return this.router.url === '/usuarios';
  }
}
