import { Component } from '@angular/core';
import { producerIncrementEpoch } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-conta',
  imports: [],
  templateUrl: './conta.html',
  styleUrl: './conta.css'
})
export class Conta {

  x = 0

  Decremento(){
    this.x--
  }
  Incremento(){
    this.x++
  }



}
