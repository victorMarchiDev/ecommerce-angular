import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CarrinhoService, ItemRecomendado } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <section class="container py-4">
      <h1 class="mb-3">Carrinho</h1>

      @if (itens().length === 0) {
        <div style="color: #888; text-align: center; margin-top: 60px;">
          <p>Seu carrinho está vazio.</p>
        </div>
      }

      @for (item of itens(); track item.id) {
        <div class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title mb-1">{{ item.nome }}</h5>
              <p class="card-text text-muted mb-0">Preço: R$ {{ item.preco.toFixed(2) }}</p>
              <p class="card-text text-muted mb-0">Quantidade: {{ item.quantidade }}</p>
            </div>
            <button class="btn btn-danger btn-sm" (click)="removerItem(item.id)">Remover</button>
          </div>
        </div>
      }

      @if (itens().length > 0) {
        <div class="d-flex justify-content-end mt-4">
          <h4>Total: R$ {{ total().toFixed(2) }}</h4>
        </div>
      }

      <section class="mt-5" aria-label="Itens recomendados">
        <h2 class="h4 mb-3">Recomendados para você</h2>

        <div class="row row-cols-1 row-cols-md-3 g-3">
          @for (recomendado of recomendados; track recomendado.id) {
            <div class="col">
              <div class="card h-100">
                <div class="card-body d-flex flex-column">
                  <h3 class="h6">{{ recomendado.nome }}</h3>
                  <p class="text-muted mb-3">R$ {{ recomendado.preco.toFixed(2) }}</p>
                  <button
                    class="btn btn-outline-primary btn-sm mt-auto"
                    type="button"
                    (click)="adicionarRecomendado(recomendado.id)"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-primary">Finalizar Compra</button>
      </div>
    </section>
  `
})

export class CarrinhoComponent {
  private readonly carrinhoService = inject(CarrinhoService);

  readonly itens = this.carrinhoService.itens;
  readonly total = this.carrinhoService.total;
  readonly recomendados = this.carrinhoService.recomendados;

  adicionarRecomendado(id: number): void {
    const recomendado = this.recomendados.find((item: ItemRecomendado) => item.id === id);

    if (!recomendado) {
      return;
    }

    this.carrinhoService.criarItem(recomendado);
  }

  removerItem(id: number): void {
    this.carrinhoService.removerItem(id);
  }
}
