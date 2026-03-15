import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-nav',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/produtos">Loja</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/produtos" routerLinkActive="active">Produtos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/carrinho" routerLinkActive="active">Carrinho</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/pedidos" routerLinkActive="active">Pedidos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/entregas" routerLinkActive="active">Entregas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class BarraNavComponent {}
