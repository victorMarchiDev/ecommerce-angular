import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntregasService, StatusEntrega } from '../../services/entregas.service';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entregas.component.html'
})
export class EntregasComponent {

  entregaAberta: number | null = null;
  mostrarFormulario = false;
  entregaEmEdicao: number | null = null;

  form: FormGroup;
  editForm: FormGroup;

  constructor(
    private readonly entregasService: EntregasService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      cliente:   ['', Validators.required],
      endereco:  ['', Validators.required],
      dataEnvio: ['', Validators.required],
      status:    ['Preparando envio', Validators.required],
      itemNome:  ['', Validators.required],
      itemQtd:   [1, [Validators.required, Validators.min(1)]]
    });

    this.editForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  entregas = () => this.entregasService.entregas();

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.form.reset({ status: 'Preparando envio', itemQtd: 1 });
    }
  }

  adicionarEntrega() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { cliente, endereco, dataEnvio, status, itemNome, itemQtd } = this.form.value;
    const [ano, mes, dia] = dataEnvio.split('-');

    this.entregasService.criar({
      cliente,
      endereco,
      dataEnvio: `${dia}/${mes}/${ano}`,
      status,
      itens: [{ nome: itemNome, quantidade: itemQtd }]
    });

    this.form.reset({ status: 'Preparando envio', itemQtd: 1 });
    this.mostrarFormulario = false;
  }

  iniciarEdicao(id: number, status: StatusEntrega) {
    this.entregaEmEdicao = id;
    this.editForm.patchValue({ status });
  }

  salvarEdicao() {
    if (this.editForm.invalid || this.entregaEmEdicao === null) return;
    this.entregasService.update(this.entregaEmEdicao, { status: this.editForm.value.status });
    this.entregaEmEdicao = null;
  }

  cancelarEdicao() {
    this.entregaEmEdicao = null;
    this.editForm.reset();
  }

  deletarEntrega(id: number) {
    this.entregasService.delete(id);
    if (this.entregaAberta === id) this.entregaAberta = null;
    if (this.entregaEmEdicao === id) this.entregaEmEdicao = null;
  }

  toggleDetalhes(id: number) {
    this.entregaAberta = this.entregaAberta === id ? null : id;
  }
}
