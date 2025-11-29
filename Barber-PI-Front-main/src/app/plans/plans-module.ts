import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans-component/plans-component';
import { PlansFormComponent } from './plans-form-component/plans-form-component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlansRoutingModule } from './plans-routing-module';

@NgModule({
  declarations: [
    PlansComponent,
    PlansFormComponent
  ],
  imports: [
    CommonModule,

    /* ► NECESSÁRIO PARA ngModel */
    FormsModule,

    /* Mantém reactive também */
    ReactiveFormsModule,

    /* Angular Material */
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    PlansRoutingModule 
  ],
  exports: [PlansComponent],
})
export class PlansModule {}
