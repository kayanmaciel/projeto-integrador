import { Routes } from '@angular/router';

export const routes: Routes = [

{
path:'contador',
loadChildren: () => import('./contador/contador-module').then(m=> m.ContadorModule)

},

{
path:'estrutura',
loadChildren: () => import('./estrutura/estrutura-module').then(m=> m.EstruturaModule)

}



];
