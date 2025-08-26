import { Routes } from '@angular/router';

export const routes: Routes = [

{
path:'contador',
loadChildren: () => import('./contador/contador-module').then(m=> m.ContadorModule)

}



];
