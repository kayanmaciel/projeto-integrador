import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
private apiUrl = 'https://cautious-barnacle-6974q7vgq59jc49v-8080.app.github.dev'; 

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/auth/login`, { email, senha });
  }
  cadastrar(usuario: any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }


  salvarUsuario(usuario: any): void {
    localStorage.setItem('usuario_logado', JSON.stringify(usuario));
  }

  getUsuarioLogado(): any {
    const user = localStorage.getItem('usuario_logado');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('usuario_logado');
  }
}
