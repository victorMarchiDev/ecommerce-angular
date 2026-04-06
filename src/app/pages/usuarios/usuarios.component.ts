import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service'; // ✅ ADICIONADO

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
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
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

    this.usuariosService.usuario = novoUsuario;

    console.log('Usuário criado:', novoUsuario);

    this.form.reset();

    this.router.navigate(['/produtos']);
  }
}