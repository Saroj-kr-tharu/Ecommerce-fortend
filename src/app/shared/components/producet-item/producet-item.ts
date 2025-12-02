import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { ProductType } from '../../../core/models/product.model';

@Component({
  selector: 'app-producet-item',
   standalone: true,  
  imports: [ CurrencyPipe, FormsModule, Rating, ],
  templateUrl: './producet-item.html',
  styleUrl: './producet-item.css',
})


export class ProducetItem {

  @Input() ProductItem!: ProductType  ;



}
