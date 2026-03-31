import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'entregas', component: EntregasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', redirectTo: 'produtos' }
];
