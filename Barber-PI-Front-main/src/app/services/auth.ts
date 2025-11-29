import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
private apiUrl = 'https://probable-computing-machine-g4w7jwxqj4jp276g-8080.app.github.dev'; 

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    // Agora ele vai montar: https://... + /auth/login
    return this.http.post(`${this.apiUrl}/auth/login`, { email, senha });
  }

  salvarUsuario(usuario: any) {
    localStorage.setItem('usuario_logado', JSON.stringify(usuario));
  }
}