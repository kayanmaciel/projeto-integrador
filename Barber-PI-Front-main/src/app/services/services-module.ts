import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ServicesComponent } from './services-component/services-component';
import { MatIconModule } from '@angular/material/icon';
import { ServicesFormComponent } from './services-form-component/services-form-component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { ServicesRoutingModule } from './services-routing-module';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesFormComponent
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
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    
    ServicesRoutingModule,
  ],
  exports: [ServicesComponent],
})
export class ServicesModule { }
