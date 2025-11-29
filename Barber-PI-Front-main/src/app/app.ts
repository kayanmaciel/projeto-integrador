import { Component, ViewChild, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false,
})
export class App {
  @ViewChild('drawer') sidenav!: MatSidenav;

  protected readonly title = signal('Barber-site');

  route = '';
  isOpen = false;
  currentUrl = '';

  constructor(private router: Router, private dialog: MatDialog) {
    // Atualiza o valor da rota atual em toda navegação
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.url;
        this.route = this.router.url.substring(1);
      });
  }

  /** Verifica se a rota atual é /auth/... (login, register, etc.) */
  isAuthRoute(): boolean {
    return this.currentUrl.startsWith('/auth/');
  }

  /** Verifica se o link atual está ativo */
  isActiveRoute(route: string): boolean {
    return this.route === route;
  }

  /** Navega para a rota informada */
  navigateTo(route: string): void {
    this.route = route;
    this.router.navigate([`/${route}`]);
  }

  scrollTo(section: string) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

}
