import { computed, Injectable, signal } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface NovoItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly itensSignal = signal<ItemCarrinho[]>([
    { id: 1, nome: 'Camiseta', preco: 59.9, quantidade: 2 },
    { id: 2, nome: 'Caneca', preco: 29.5, quantidade: 1 },
    { id: 3, nome: 'Livro', preco: 89.0, quantidade: 1 }
  ]);

  private nextId = 4;

  readonly itens = this.itensSignal.asReadonly();

  readonly total = computed(() => {
    const lista = this.itensSignal();
    let soma = 0;

    for (const item of lista) {
      soma += item.preco * item.quantidade;
    }

    return soma;
  });

  removerItem(id: number): void {
    this.itensSignal.update((itensAtuais: ItemCarrinho[]) =>
      itensAtuais.filter((item: ItemCarrinho) => item.id !== id)
    );
  }

  atualizarProduto(id: number, data: NovoItemCarrinho): void {
    const nome = data.nome.trim();
    const preco = Number(data.preco);
    const quantidade = Number(data.quantidade);

    if (!nome || preco <= 0 || quantidade <= 0) {
      return;
    }

    this.itensSignal.update((itensAtuais: ItemCarrinho[]) =>
      itensAtuais.map((item: ItemCarrinho) =>
        item.id === id
          ? {
              ...item,
              nome,
              preco,
              quantidade
            }
          : item
      )
    );
  }

  adicionarProduto(data: NovoItemCarrinho): void {
    const nome = data.nome.trim();
    const preco = Number(data.preco);
    const quantidade = Number(data.quantidade);

    if (!nome || preco <= 0 || quantidade <= 0) {
      return;
    }

    const novoItem: ItemCarrinho = {
      id: this.nextId++,
      nome,
      preco,
      quantidade
    };

    this.itensSignal.update((itensAtuais: ItemCarrinho[]) => [...itensAtuais, novoItem]);
  }
}
