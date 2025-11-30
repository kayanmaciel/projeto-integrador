import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plano {
  id?: number;
  nome: string;
  descricao: string;
  precoPromocional: number;
  duracao: number;
  beneficios: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private readonly BASE_URL = 'https://cautious-barnacle-6974q7vgq59jc49v-8080.app.github.dev//planos';

  private http = inject(HttpClient);

  buscarTodos(): Observable<Plano[]> {
    console.log(`Plans: Realizando GET em ${this.BASE_URL}`);
    return this.http.get<Plano[]>(this.BASE_URL);
  }

  criarPlano(novoPlano: Omit<Plano, 'id'>): Observable<Plano> {
    console.log(`Plans: Realizando POST em ${this.BASE_URL}`);
    return this.http.post<Plano>(this.BASE_URL, novoPlano);
  }

  excluir(id: number): Observable<void> {
    console.log(`Plans: Realizando DELETE em ${this.BASE_URL}/${id}`);
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  buscarPorId(id: number): Observable<Plano> {
    console.log(`Plans: Realizando GET em ${this.BASE_URL}/${id}`);
    return this.http.get<Plano>(`${this.BASE_URL}/${id}`);
  }

 atualizar(id: number, data: Omit<Plano, 'id'>): Observable<any> {
  return this.http.put(`${this.BASE_URL}/${id}`, data, { responseType: 'text' as 'json' });
}

}
