import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: number;
  data: string;
  status: 'Entregue' | 'Em trânsito' | 'Aguardando pagamento' | 'Cancelado';
  total: number;
  itens: { nome: string; quantidade: number; preco: number }[];
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container py-4">
      <h1 class="mb-3">Meus Pedidos</h1>

      <div *ngIf="pedidos.length === 0" style="color: #888; text-align: center; margin-top: 60px;">
        <p>Você ainda não fez nenhum pedido.</p>
      </div>

      <div *ngFor="let pedido of pedidos" class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center"
             style="cursor: pointer;"
             (click)="toggleDetalhes(pedido.id)">
          <div>
            <strong>Pedido #{{ pedido.id }}</strong>
            <span class="ms-2 text-muted" style="font-size: 13px;">{{ pedido.data }}</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="badge" [ngClass]="{
              'bg-success': pedido.status === 'Entregue',
              'bg-primary': pedido.status === 'Em trânsito',
              'bg-warning text-dark': pedido.status === 'Aguardando pagamento',
              'bg-danger': pedido.status === 'Cancelado'
            }">{{ pedido.status }}</span>
            <strong>R$ {{ pedido.total.toFixed(2) }}</strong>
            <span>{{ pedidoAberto === pedido.id ? '▲' : '▼' }}</span>
          </div>
        </div>

        <div class="card-body" *ngIf="pedidoAberto === pedido.id">
          <table class="table table-sm mb-0">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of pedido.itens">
                <td>{{ item.nome }}</td>
                <td>{{ item.quantidade }}</td>
                <td>R$ {{ item.preco.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
})
export class PedidosComponent {
  pedidos: Pedido[] = [
    {
      id: 1001,
      data: '10/03/2026',
      status: 'Entregue',
      total: 259.90,
      itens: [
        { nome: 'Camiseta Preta', quantidade: 2, preco: 79.90 },
        { nome: 'Calça Jeans', quantidade: 1, preco: 100.10 }
      ]
    },
    {
      id: 1002,
      data: '13/03/2026',
      status: 'Em trânsito',
      total: 149.90,
      itens: [
        { nome: 'Tênis Branco', quantidade: 1, preco: 149.90 }
      ]
    },
    {
      id: 1003,
      data: '15/03/2026',
      status: 'Aguardando pagamento',
      total: 89.90,
      itens: [
        { nome: 'Boné Azul', quantidade: 1, preco: 49.90 },
        { nome: 'Meia Esportiva', quantidade: 2, preco: 20.00 }
      ]
    }
  ];

  pedidoAberto: number | null = null;

  toggleDetalhes(id: number) {
    this.pedidoAberto = this.pedidoAberto === id ? null : id;
  }
}