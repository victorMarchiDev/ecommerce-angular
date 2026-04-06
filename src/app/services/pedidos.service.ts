import { Injectable, signal } from '@angular/core';

export interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
}

export type StatusPedido = 'Entregue' | 'Em trânsito' | 'Aguardando pagamento' | 'Cancelado';

export interface Pedido {
  id: number;
  data: string;
  status: StatusPedido;
  total: number;
  itens: ItemPedido[];
}

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private readonly pedidosSignal = signal<Pedido[]>([
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
  ]);

  private nextId = 1004;

  readonly pedidos = this.pedidosSignal.asReadonly();

  criar(data: { itens: ItemPedido[] }): void {
    const total = data.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
    const hoje = new Date();
    const dataFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;

    const novo: Pedido = {
      id: this.nextId++,
      data: dataFormatada,
      status: 'Aguardando pagamento',
      total,
      itens: data.itens
    };

    this.pedidosSignal.update((lista) => [novo, ...lista]);
  }

  update(id: number, data: { status: StatusPedido }): void {
    this.pedidosSignal.update((lista) =>
      lista.map((p) => (p.id === id ? { ...p, status: data.status } : p))
    );
  }

  delete(id: number): void {
    this.pedidosSignal.update((lista) => lista.filter((p) => p.id !== id));
  }
}
