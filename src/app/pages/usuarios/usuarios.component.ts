import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="container py-4">
      <h1 class="mb-3">Cadastro de Usuário</h1>

      <form [formGroup]="form" (ngSubmit)="adicionarUsuario()" class="card p-3 mb-4">

        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            formControlName="nome"
          >
          <small *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched" class="text-danger">
            Nome é obrigatório
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            formControlName="email"
          >
          <small *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-danger">
            Email válido é obrigatório
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input
            type="password"
            class="form-control"
            formControlName="senha"
          >
          <small *ngIf="form.get('senha')?.invalid && form.get('senha')?.touched" class="text-danger">
            Senha é obrigatória
          </small>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
          Cadastrar
        </button>
      </form>

      <h2 class="mb-3">Usuários cadastrados</h2>

      <div *ngIf="usuarios().length === 0" class="text-muted text-center">
        Nenhum usuário cadastrado ainda.
      </div>

      <ul class="list-group">
        <li *ngFor="let u of usuarios()" class="list-group-item d-flex justify-content-between">
          <span>
            <strong>{{ u.nome }}</strong> - {{ u.email }}
          </span>
          <span class="text-muted">ID: {{ u.id }}</span>
        </li>
      </ul>
    </section>
  `
})
export class UsuariosComponent {

  form: FormGroup;

  usuarios = signal<Usuario[]>([]);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  adicionarUsuario() {
    if (this.form.invalid) return;

    const novoUsuario: Usuario = {
      id: Date.now(),
      nome: this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!
    };

    this.usuarios.update(lista => [...lista, novoUsuario]);

    console.log('Usuário criado:', novoUsuario);

    this.form.reset();

    this.router.navigate(['/produtos']);
  }
}