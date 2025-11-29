import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlansService, Plano } from '../../api/plans/plans';

@Component({
  selector: 'app-plans-component',
  standalone: false,
  templateUrl: './plans-component.html',
  styleUrl: './plans-component.css'
})
export class PlansComponent implements OnInit {

  plans: Plano[] = [];
  loading = true;

  constructor(
    private plansService: PlansService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.plansService.buscarTodos().subscribe({
      next: (data) => {
        this.plans = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erro ao carregar planos:", err);
        this.loading = false;
      }
    });
  }

  // 🔥 NOVO — MÉTODO DELETE
  excluirPlano(id: number): void {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;

    this.plansService.excluir(id).subscribe({
      next: () => {
        alert("Plano excluído com sucesso.");
        this.loadPlans(); // recarrega
      },
      error: (err) => {
        console.error("Erro ao excluir plano:", err);
        alert("Erro ao excluir plano.");
      }
    });
  }
}
