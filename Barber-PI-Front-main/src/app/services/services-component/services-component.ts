import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicoService, Servico } from '../../api/services/services'

@Component({
  selector: 'app-services-component',
  standalone: false,
  templateUrl: './services-component.html',
  styleUrl: './services-component.css'
})
export class ServicesComponent implements OnInit {

  services: Servico[] = [];
  loading = true;

  constructor(
    private servicoService: ServicoService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicoService.listarTodos().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;

        console.log("Serviços carregados:", data);

        this.cdr.detectChanges();  // <-- AQUI RESOLVE O BUG!
      },
      error: (err) => {
        console.error("Erro ao carregar serviços:", err);
        this.loading = false;
      }
    });
  }
  excluirServico(id: number) {
  if (!confirm("Deseja excluir este serviço?")) return;

  this.servicoService.deletar(id).subscribe({
    next: () => {
      alert("Serviço excluído com sucesso!");
      this.loadServices();
    },
    error: () => alert("Erro ao excluir serviço.")
  });
}

}
