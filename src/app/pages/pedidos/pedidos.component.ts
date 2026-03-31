import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  data: string;
  status: 'Entregue' | 'Em trânsito' | 'Aguardando pagamento' | 'Cancelado';
  total: number;
  itens: { nome: string; quantidade: number; preco: number }[];
}

interface ProdutoDisponivel {
  id: number;
  nome: string;
  preco: number;
}

interface ItemFormulario {
  produtoId: number | null;
  quantidade: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="mb-0">Meus Pedidos</h1>
        <button class="btn btn-primary" (click)="toggleFormulario()">
          {{ mostrarFormulario ? 'Cancelar' : 'Novo Pedido' }}
        </button>
      </div>

      <div class="card mb-4" *ngIf="mostrarFormulario">
        <div class="card-header">
          <strong>Novo Pedido</strong>
        </div>
        <div class="card-body">
          <div *ngFor="let item of itensPedido; let i = index" class="row g-2 mb-2 align-items-end">
            <div class="col">
              <label class="form-label small">Produto</label>
              <select class="form-select" [(ngModel)]="item.produtoId">
                <option [ngValue]="null">Selecione...</option>
                <option *ngFor="let p of produtos" [ngValue]="p.id">{{ p.nome }} - R$ {{ p.preco.toFixed(2) }}</option>
              </select>
            </div>
            <div class="col-2">
              <label class="form-label small">Qtd</label>
              <input type="number" class="form-control" [(ngModel)]="item.quantidade" min="1" max="99">
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-danger btn-sm" (click)="removerItem(i)" *ngIf="itensPedido.length > 1">✕</button>
            </div>
          </div>

          <button class="btn btn-outline-secondary btn-sm mb-3" (click)="adicionarItem()">+ Adicionar produto</button>

          <div class="d-flex justify-content-between align-items-center">
            <strong>Total: R$ {{ calcularTotalFormulario().toFixed(2) }}</strong>
            <button class="btn btn-success" (click)="criarPedido()" [disabled]="!formularioValido()">Confirmar Pedido</button>
          </div>
        </div>
      </div>

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
  produtos: ProdutoDisponivel[] = [
    { id: 1, nome: 'Camiseta', preco: 59.9 },
    { id: 2, nome: 'Caneca', preco: 29.5 },
    { id: 3, nome: 'Livro', preco: 89.0 },
    { id: 4, nome: 'Bola', preco: 93.9 },
    { id: 5, nome: 'Computador', preco: 2129.5 },
    { id: 6, nome: 'Tenis', preco: 123.0 }
  ];

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
  mostrarFormulario = false;
  itensPedido: ItemFormulario[] = [{ produtoId: null, quantidade: 1 }];
  private nextId = 1004;

  toggleDetalhes(id: number) {
    this.pedidoAberto = this.pedidoAberto === id ? null : id;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.itensPedido = [{ produtoId: null, quantidade: 1 }];
    }
  }

  adicionarItem() {
    this.itensPedido.push({ produtoId: null, quantidade: 1 });
  }

  removerItem(index: number) {
    this.itensPedido.splice(index, 1);
  }

  calcularTotalFormulario(): number {
    return this.itensPedido.reduce((acc, item) => {
      if (!item.produtoId) return acc;
      const produto = this.produtos.find(p => p.id === item.produtoId);
      return acc + (produto ? produto.preco * item.quantidade : 0);
    }, 0);
  }

  formularioValido(): boolean {
    return this.itensPedido.every(item => item.produtoId !== null && item.quantidade > 0)
      && this.itensPedido.length > 0;
  }

  criarPedido() {
    if (!this.formularioValido()) return;

    const itens = this.itensPedido
      .filter(item => item.produtoId !== null)
      .map(item => {
        const produto = this.produtos.find(p => p.id === item.produtoId)!;
        return { nome: produto.nome, quantidade: item.quantidade, preco: produto.preco };
      });

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const hoje = new Date();
    const dataFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;

    this.pedidos.unshift({
      id: this.nextId++,
      data: dataFormatada,
      status: 'Aguardando pagamento',
      total,
      itens
    });

    this.itensPedido = [{ produtoId: null, quantidade: 1 }];
    this.mostrarFormulario = false;
  }
}