import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agendamento {
  id?: number;
  dataHora: string;
  usuario: { id?: number };
  servico: { id?: number, nome?: string };
  status: string;
  observacoes?: string;
  dataCriacao?: string;

   dateObj?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly BASE_URL =
    'https://probable-computing-machine-g4w7jwxqj4jp276g-8080.app.github.dev/agendamentos';

  private http = inject(HttpClient);

  // ================================
  // GET - Listar todos
  // ================================
  listarTodos(): Observable<Agendamento[]> {
    console.log("Agendamentos: GET", this.BASE_URL);
    return this.http.get<Agendamento[]>(this.BASE_URL);
  }

  // ================================
  // POST - Criar
  // ================================
  criar(agendamento: Omit<Agendamento, 'id' | 'dataCriacao'>): Observable<Agendamento> {
    console.log("Agendamentos: POST", this.BASE_URL);
    return this.http.post<Agendamento>(this.BASE_URL, agendamento);
  }

  // ================================
  // PUT - Atualizar / Remarcar
  // ================================
  atualizar(id: number, agendamento: Partial<Agendamento>): Observable<Agendamento> {
    const url = `${this.BASE_URL}/${id}`;
    console.log("Agendamentos: PUT", url, agendamento);
    return this.http.put<Agendamento>(url, agendamento);
  }

  // ================================
  // DELETE - Cancelar
  // ================================
  deletar(id: number): Observable<void> {
    const url = `${this.BASE_URL}/${id}`;
    console.log("Agendamentos: DELETE", url);
    return this.http.delete<void>(url);
  }
}
