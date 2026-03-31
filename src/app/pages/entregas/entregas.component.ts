import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="mb-0">Controle de Entregas</h1>
        <button class="btn btn-primary" (click)="mostrarFormulario = !mostrarFormulario">
          {{ mostrarFormulario ? 'Cancelar' : 'Cadastrar entrega' }}
        </button>
      </div>

      <div *ngIf="mostrarFormulario" class="card mb-4">
        <div class="card-body">
          <form (ngSubmit)="adicionarEntrega()">
            <div class="row g-3 align-items-end">
              <div class="col-md-4">
                <label class="form-label">Cliente</label>
                <input class="form-control" [(ngModel)]="form.cliente" name="cliente" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Endereço</label>
                <input class="form-control" [(ngModel)]="form.endereco" name="endereco" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Data de Envio</label>
                <input type="date" class="form-control" [(ngModel)]="form.dataEnvio" name="dataEnvio" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Status</label>
                <select class="form-select" [(ngModel)]="form.status" name="status">
                  <option value="Preparando envio">Preparando envio</option>
                  <option value="Em transporte">Em transporte</option>
                  <option value="Saiu para entrega">Saiu para entrega</option>
                  <option value="Entregue">Entregue</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Produto</label>
                <input class="form-control" [(ngModel)]="form.itemNome" name="itemNome" required />
              </div>
              <div class="col-md-2">
                <label class="form-label">Quantidade</label>
                <input type="number" class="form-control" [(ngModel)]="form.itemQtd" name="itemQtd" required min="1" />
              </div>
              <div class="col-md-2">
                <button class="btn btn-success w-100" type="submit">Adicionar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
  ];

  entregaAberta: number | null = null;
  mostrarFormulario = false;

  form: { cliente: string; endereco: string; dataEnvio: string; status: Entrega['status']; itemNome: string; itemQtd: number } = {
    cliente: '',
    endereco: '',
    dataEnvio: '',
    status: 'Preparando envio',
    itemNome: '',
    itemQtd: 1
  };
  adicionarEntrega() {
    if (!this.form.cliente || !this.form.endereco || !this.form.dataEnvio || !this.form.itemNome) return;

    const [ano, mes, dia] = this.form.dataEnvio.split('-');

    this.entregas.push({
      id: Math.max(...this.entregas.map(e => e.id)) + 1,
      cliente: this.form.cliente,
      endereco: this.form.endereco,
      dataEnvio: `${dia}/${mes}/${ano}`,
      status: this.form.status,
      itens: [{ nome: this.form.itemNome, quantidade: this.form.itemQtd }]
    });

    this.form = { cliente: '', endereco: '', dataEnvio: '', status: 'Preparando envio', itemNome: '', itemQtd: 1 };
    this.mostrarFormulario = false;
  }

  toggleDetalhes(id: number) {
    this.entregaAberta = this.entregaAberta === id ? null : id;
  }
}