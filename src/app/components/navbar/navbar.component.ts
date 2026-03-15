import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/products" routerLinkActive="active">Produtos</a>
      <a routerLink="/cart" routerLinkActive="active">Carrinho</a>
      <a routerLink="/orders" routerLinkActive="active">Pedidos</a>
      <a routerLink="/deliveries" routerLinkActive="active">Entregas</a>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: #222;
    }
    .navbar a {
      color: #fff;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    .navbar a.active {
      background: #fff;
      color: #222;
      font-weight: 600;
    }
  `]
})
export class NavbarComponent {}
