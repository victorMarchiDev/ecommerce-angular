import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carrinho.component.html'
})

export class CarrinhoComponent {
  private readonly carrinhoService = inject(CarrinhoService);
  private readonly formBuilder = inject(FormBuilder);

  readonly itens = this.carrinhoService.itens;
  readonly produtoAdicionado = signal(false);
  readonly editarId = signal<number | null>(null);

  readonly produtoForm = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    quantidade: [1, [Validators.required, Validators.min(1)]]
  });

  campoInvalido(campo: 'nome' | 'preco' | 'quantidade'): boolean {
    const controle = this.produtoForm.controls[campo];

    return controle.invalid && controle.touched;
  }

  adicionarProduto(): void {
    this.produtoAdicionado.set(false);

    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();

      return;
    }

    const { nome, preco, quantidade } = this.produtoForm.getRawValue();
    const idEdicao = this.editarId();

    if (idEdicao === null) {
      this.carrinhoService.adicionarProduto({ nome, preco, quantidade });
    } else {
      this.carrinhoService.atualizarProduto(idEdicao, { nome, preco, quantidade });
      this.editarId.set(null);
    }

    this.produtoAdicionado.set(true);
    this.produtoForm.markAsPristine();
    this.produtoForm.markAsUntouched();

    this.produtoForm.reset({
      nome: '',
      preco: 0,
      quantidade: 1
    });
  }

  iniciarEdicao(id: number): void {
    const item = this.itens().find((produto: ItemCarrinho) => produto.id === id);

    if (!item) {
      return;
    }

    this.editarId.set(id);
    this.produtoAdicionado.set(false);
    this.produtoForm.setValue({
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade
    });
  }

  removerProduto(id: number): void {
    this.carrinhoService.removerItem(id);

    if (this.editarId() === id) {
      this.editarId.set(null);
      this.produtoAdicionado.set(false);
      this.produtoForm.reset({
        nome: '',
        preco: 0,
        quantidade: 1
      });
      this.produtoForm.markAsPristine();
      this.produtoForm.markAsUntouched();
    }
  }
}
