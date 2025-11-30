import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface de tipagem
export interface Servico {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiUrl = 'https://cautious-barnacle-6974q7vgq59jc49v-8080.app.github.dev//servicos';

  constructor(private http: HttpClient) { }

  // GET /servicos
  listarTodos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  // GET /servicos/{id}
  buscarPorId(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  // POST /servicos
  criar(servico: Omit<Servico, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, servico, {
      responseType: 'text' as 'json' // 👈 evita erro de parse
    });
  }

  // PUT /servicos/{id}
  atualizar(id: number, servico: Servico): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, servico, {
      responseType: 'text' as 'json' // 👈 ESSENCIAL PARA EVITAR ERRO
    });
  }

  // DELETE /servicos/{id}
  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json' // 👈 também evita erro se backend retorna vazio
    });
  }

}
