import { Component } from '@angular/core';
import { Router } from '@angular/router';
// 👇 Verifique se o caminho do import está correto
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  mensagemErro: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  fazerLogin() {
    // 1. VALIDAÇÃO MANUAL: Se clicar sem digitar, avisa o usuário.
    if (!this.email || !this.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      return; 
    }

    this.mensagemErro = '';
    this.isLoading = true;

    // 2. TENTA LOGAR
    this.authService.login(this.email, this.senha).subscribe({
      next: (usuario) => {
        // SUCESSO!
        this.authService.salvarUsuario(usuario);
        this.isLoading = false;
        
        // 3. VAI PARA A HOME
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        // ERRO!
        this.isLoading = false;
        if (erro.status === 401) {
          this.mensagemErro = 'E-mail ou senha incorretos.';
        } else {
          this.mensagemErro = 'Erro de conexão com o servidor.';
        }
      }
    });
  }
}