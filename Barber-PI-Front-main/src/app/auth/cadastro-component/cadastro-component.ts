import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cadastro-component',
  standalone: false,
  templateUrl: './cadastro-component.html',
  styleUrl: '../login-component/login-component.css' 
})
export class CadastroComponent {


  usuario = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    tipoUsuario: 'CLIENTE' 
  };

  confirmarSenha: string = '';
  mensagemErro: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  fazerCadastro() {

    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    if (this.usuario.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }


    this.mensagemErro = '';
    this.isLoading = true;


    this.authService.cadastrar(this.usuario).subscribe({
      next: (resposta) => {
        console.log('Cadastro realizado com sucesso:', resposta);
        this.isLoading = false;
        

        alert('Conta criada com sucesso!');
        this.router.navigate(['/auth/login']);
      },
      error: (erro) => {
        console.error('Erro no cadastro:', erro);
        this.isLoading = false;


        if (erro.status === 400) {

          this.mensagemErro = 'Erro: Verifique os dados ou se o e-mail já existe.';
        } else {
          this.mensagemErro = 'Falha ao conectar com o servidor. Tente novamente.';
        }
      }
    });
  }
}