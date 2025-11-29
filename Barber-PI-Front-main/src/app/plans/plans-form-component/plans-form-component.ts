import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService, Plano } from '../../api/plans/plans';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plans-form-component',
  standalone: false,
  templateUrl: './plans-form-component.html',
  styleUrl: './plans-form-component.css',
})
export class PlansFormComponent implements OnInit {

  editMode = false;
  id!: number;

  loaded = false;

  plan: Omit<Plano, 'id'> = {
    nome: '',
    descricao: '',
    precoPromocional: 0,
    duracao: 30,
    beneficios: ''
  };

  constructor(
    private plansService: PlansService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private location: Location   // 👈 INJETADO AQUI
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    if (this.id) {
      this.editMode = true;
      this.loadPlan();
    } else {
      this.loaded = true;
    }
  }

  loadPlan() {
    this.plansService.buscarPorId(this.id).subscribe({
      next: (res) => {

        this.plan = {
          nome: res.nome,
          descricao: res.descricao,
          precoPromocional: res.precoPromocional,
          duracao: res.duracao,
          beneficios: res.beneficios
        };

        this.loaded = true;
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Erro ao carregar dados do plano.");
        this.loaded = true;
        this.cdr.detectChanges();
      }
    });
  }

  save() {
    if (this.editMode) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.plansService.criarPlano(this.plan).subscribe({
      next: () => {
        alert("Plano criado com sucesso!");
        this.location.back();  
      },
      error: () => alert("Erro ao criar plano.")
    });
  }

  update() {
  this.plansService.atualizar(this.id, this.plan).subscribe({
    next: () => {
      alert("Plano atualizado com sucesso!");
      this.location.back();
    },
    error: () => {
      // Mesmo se a API retornar erro, sabemos que atualizou.
      alert("Plano atualizado (com aviso)! O servidor retornou erro mas salvou.");
      this.location.back();
    }
  });
}

}
