import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardbanner',
  imports: [CurrencyPipe],
  templateUrl: './cardbanner.html',
  styleUrl: './cardbanner.css',
})
export class Cardbanner {
   @Input() banner!: any  ;
}
