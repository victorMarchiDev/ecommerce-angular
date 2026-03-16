import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Entrega {
  id: number;
  cliente: string;
  endereco: string;
  dataEnvio: string;
  status: 'Preparando envio' | 'Em transporte' | 'Saiu para entrega' | 'Entregue';
  itens: { nome: string; quantidade: number }[];
}

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container py-4">
      <h1 class="mb-3">Controle de Entregas</h1>

      <div *ngIf="entregas.length === 0" style="color: #888; text-align: center; margin-top: 60px;">
        <p>Nenhuma entrega encontrada.</p>
      </div>

      <div *ngFor="let entrega of entregas" class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center"
             style="cursor: pointer;"
             (click)="toggleDetalhes(entrega.id)">
          
          <div>
            <strong>Entrega #{{ entrega.id }}</strong>
            <span class="ms-2 text-muted" style="font-size: 13px;">
              {{ entrega.dataEnvio }}
            </span>
          </div>

          <div class="d-flex align-items-center gap-3">
            <span class="badge" [ngClass]="{
              'bg-secondary': entrega.status === 'Preparando envio',
              'bg-primary': entrega.status === 'Em transporte',
              'bg-warning text-dark': entrega.status === 'Saiu para entrega',
              'bg-success': entrega.status === 'Entregue'
            }">
              {{ entrega.status }}
            </span>

            <span>{{ entregaAberta === entrega.id ? '▲' : '▼' }}</span>
          </div>

        </div>

        <div class="card-body" *ngIf="entregaAberta === entrega.id">
          <p><strong>Cliente:</strong> {{ entrega.cliente }}</p>
          <p><strong>Endereço:</strong> {{ entrega.endereco }}</p>

          <table class="table table-sm">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of entrega.itens">
                <td>{{ item.nome }}</td>
                <td>{{ item.quantidade }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  `
})
export class EntregasComponent {

  entregas: Entrega[] = [
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
      itens: [
        { nome: 'Tênis Branco', quantidade: 1 }
      ]
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
  ];

  entregaAberta: number | null = null;

  toggleDetalhes(id: number) {
    this.entregaAberta = this.entregaAberta === id ? null : id;
  }

}