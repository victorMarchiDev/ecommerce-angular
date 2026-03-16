import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container py-4">
      <h1 class="mb-3">Carrinho</h1>

      <div *ngIf="itens.length === 0" style="color: #888; text-align: center; margin-top: 60px;">
        <p>Seu carrinho está vazio.</p>
      </div>

      <div *ngFor="let item of itens" class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">{{ item.nome }}</h5>
            <p class="card-text text-muted mb-0">Preço: R$ {{ item.preco.toFixed(2) }}</p>
            <p class="card-text text-muted mb-0">Quantidade: {{ item.quantidade }}</p>
          </div>
          <button class="btn btn-danger btn-sm">Remover</button>
        </div>
      </div>

      <div *ngIf="itens.length > 0" class="d-flex justify-content-end mt-4">
        <h4>Total: R$ {{ total.toFixed(2) }}</h4>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-primary">Finalizar Compra</button>
      </div>
    </section>
  `
})

export class CarrinhoComponent {
  itens: ItemCarrinho[] = [
    { id: 1, nome: 'Camiseta', preco: 59.9, quantidade: 2 },
    { id: 2, nome: 'Caneca', preco: 29.5, quantidade: 1 },
    { id: 3, nome: 'Livro', preco: 89.0, quantidade: 1 }
  ];

  get total(): number {
    return this.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  
}
