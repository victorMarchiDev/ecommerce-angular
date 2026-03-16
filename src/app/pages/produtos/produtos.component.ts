import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 class="mb-0">Produtos</h1>
        </div>
      </div>

      <div *ngIf="(produtos().length === 0)" class="alert alert-info">Nenhum produto cadastrado.</div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" *ngFor="let p of produtos()">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ p.nome }}</h5>
              <p class="card-text text-muted mb-4">Preço: R$ {{ p.preco | number:'1.2-2' }}</p>
              <div class="mt-auto d-flex justify-content-between">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProdutosComponent {
  produtos = signal<Produto[]>([
    { id: 1, nome: 'Camiseta', preco: 59.9 },
    { id: 2, nome: 'Caneca', preco: 29.5 },
    { id: 3, nome: 'Livro', preco: 89.0 },
    { id: 4, nome: 'Bola', preco: 93.9 },
    { id: 5, nome: 'Computador', preco: 2129.5 },
    { id: 6, nome: 'Tenis', preco: 123.0 }
  ]);

  mostrarFormulario = false;

  form: { nome: string; preco: number | null } = { nome: '', preco: null };

  private nextId = 4;
}
