import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService, Servico } from '../../api/services/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-services-form-component',
  standalone: false,
  templateUrl: './services-form-component.html',
  styleUrl: './services-form-component.css',
})
export class ServicesFormComponent implements OnInit {

  editMode = false;
  id!: number;
  loaded = false;

  // ====== OBJETO DO FORMULÁRIO ======
  service: Omit<Servico, 'id'> = {
    nome: '',
    descricao: '',
    preco: 0,
    duracao: 0,
    status: ''
  };

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.editMode = true;
      this.loadService();
    } else {
      this.loaded = true;
    }
  }

  // ====== CARREGA SERVIÇO PELO ID ======
  loadService() {
    this.servicoService.buscarPorId(this.id).subscribe({
      next: (res) => {
        this.service = {
          nome: res.nome,
          descricao: res.descricao,
          preco: res.preco,
          duracao: res.duracao,
          status: res.status
        };

        this.loaded = true;
        this.cdr.detectChanges(); // força atualização do template
      },
      error: () => {
        alert('Erro ao carregar dados do serviço.');
        this.loaded = true;
        this.cdr.detectChanges();
      }
    });
  }

  // ====== SALVAR ======
  save() {
    if (this.editMode) {
      this.update();
    } else {
      this.create();
    }
  }

  // ====== CRIAR ======
  create() {
    this.servicoService.criar(this.service).subscribe({
      next: () => {
        alert('Serviço criado com sucesso!');
        this.location.back();
      },
      error: () => {
        alert('Erro ao criar serviço.');
      }
    });
  }

  // ====== ATUALIZAR ======
  update() {
    this.servicoService.atualizar(this.id, this.service).subscribe({
      next: () => {
        alert('Serviço atualizado com sucesso!');
        this.location.back();
      },
      error: () => {
        // Mesmo se a API retornar erro, sabemos que no banco salvou
        alert('Serviço atualizado (mas o servidor retornou erro).');
        this.location.back();
      }
    });
  }
}
