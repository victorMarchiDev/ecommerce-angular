import { Injectable } from '@angular/core';

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: Usuario | null = null;

}