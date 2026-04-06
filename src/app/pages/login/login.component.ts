import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService, Usuario } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form: FormGroup;
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.usuario = this.usuariosService.usuario;

    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  salvarAlteracoes() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usuariosService.usuario = this.form.value;

    alert('Dados atualizados!');
  }

  deletarUsuario() {
    this.usuariosService.usuario = null;

    this.router.navigate(['/usuarios']);
  }
}