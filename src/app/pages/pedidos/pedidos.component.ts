import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { PedidosService, StatusPedido } from '../../services/pedidos.service';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent {
  pedidoAberto: number | null = null;
  mostrarFormulario = false;
  pedidoEmEdicao: number | null = null;

  form: FormGroup;
  editForm: FormGroup;

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly produtosService: ProdutosService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      itens: this.fb.array([this.criarItemGroup()])
    });

    this.editForm = this.fb.group({
      status: ['', Validators.required]
    });

    this.produtos = this.produtosService.produtos();
  }

  pedidos = () => this.pedidosService.pedidos();
  produtos: ReturnType<typeof this.produtosService.produtos> = [];

  get itensArray(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  private criarItemGroup(): FormGroup {
    return this.fb.group({
      produtoId: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  toggleDetalhes(id: number) {
    this.pedidoAberto = this.pedidoAberto === id ? null : id;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.form.reset();
      this.itensArray.clear();
      this.itensArray.push(this.criarItemGroup());
    }
  }

  adicionarItem() {
    this.itensArray.push(this.criarItemGroup());
  }

  removerItem(index: number) {
    this.itensArray.removeAt(index);
  }

  calcularTotalFormulario(): number {
    return this.itensArray.controls.reduce((acc, ctrl) => {
      const produtoId = ctrl.get('produtoId')?.value;
      const quantidade = ctrl.get('quantidade')?.value ?? 0;
      const produto = this.produtos.find(p => p.id === produtoId);
      return acc + (produto ? produto.preco * quantidade : 0);
    }, 0);
  }

  criarPedido() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const itens = this.itensArray.controls.map(ctrl => {
      const produtoId = ctrl.get('produtoId')!.value;
      const quantidade = ctrl.get('quantidade')!.value;
      const produto = this.produtos.find(p => p.id === produtoId)!;
      return { nome: produto.nome, quantidade, preco: produto.preco };
    });

    this.pedidosService.criar({ itens });

    this.form.reset();
    this.itensArray.clear();
    this.itensArray.push(this.criarItemGroup());
    this.mostrarFormulario = false;
  }

  iniciarEdicao(id: number, status: StatusPedido) {
    this.pedidoEmEdicao = id;
    this.editForm.patchValue({ status });
  }

  salvarEdicao() {
    if (this.editForm.invalid || this.pedidoEmEdicao === null) return;
    this.pedidosService.update(this.pedidoEmEdicao, { status: this.editForm.value.status });
    this.pedidoEmEdicao = null;
  }

  cancelarEdicao() {
    this.pedidoEmEdicao = null;
    this.editForm.reset();
  }

  deletarPedido(id: number) {
    this.pedidosService.delete(id);
    if (this.pedidoAberto === id) this.pedidoAberto = null;
    if (this.pedidoEmEdicao === id) this.pedidoEmEdicao = null;
  }
}