import { Injectable, signal } from '@angular/core';

export interface ItemEntrega {
  nome: string;
  quantidade: number;
}

export type StatusEntrega = 'Preparando envio' | 'Em transporte' | 'Saiu para entrega' | 'Entregue';

export interface Entrega {
  id: number;
  cliente: string;
  endereco: string;
  dataEnvio: string;
  status: StatusEntrega;
  itens: ItemEntrega[];
}

@Injectable({ providedIn: 'root' })
export class EntregasService {
  private readonly entregasSignal = signal<Entrega[]>([
    {
      id: 2001,
      cliente: 'Carlos Silva',
      endereco: 'Rua das Flores, 120',
      dataEnvio: '15/03/2026',
      status: 'Em transporte',
      itens: [
        { nome: 'Camiseta Preta', quantidade: 2 },
        { nome: 'Boné Esportivo', quantidade: 1 }
      ]
    },
    {
      id: 2002,
      cliente: 'Maria Oliveira',
      endereco: 'Av. Brasil, 450',
      dataEnvio: '16/03/2026',
      status: 'Saiu para entrega',
      itens: [{ nome: 'Tênis Branco', quantidade: 1 }]
    },
    {
      id: 2003,
      cliente: 'João Santos',
      endereco: 'Rua Paraná, 88',
      dataEnvio: '17/03/2026',
      status: 'Preparando envio',
      itens: [
        { nome: 'Calça Jeans', quantidade: 1 },
        { nome: 'Cinto Couro', quantidade: 1 }
      ]
    }
  ]);

  private nextId = 2004;

  readonly entregas = this.entregasSignal.asReadonly();

  criar(data: { cliente: string; endereco: string; dataEnvio: string; status: StatusEntrega; itens: ItemEntrega[] }): void {
    const nova: Entrega = {
      id: this.nextId++,
      ...data
    };
    this.entregasSignal.update((lista) => [nova, ...lista]);
  }

  update(id: number, data: { status: StatusEntrega }): void {
    this.entregasSignal.update((lista) =>
      lista.map((e) => (e.id === id ? { ...e, status: data.status } : e))
    );
  }

  delete(id: number): void {
    this.entregasSignal.update((lista) => lista.filter((e) => e.id !== id));
  }
}
