import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing-routing-module').then((m) => m.LandingRoutingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home-routing-module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'plans',
    loadChildren: () =>
      import('./plans/plans-module').then((m) => m.PlansModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./services/services-module').then((m) => m.ServicesModule),
  },

  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda-routing-module').then(m => m.AgendaRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
