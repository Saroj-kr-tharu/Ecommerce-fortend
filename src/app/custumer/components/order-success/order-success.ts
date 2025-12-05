import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export class OrderSuccess implements OnInit {

  orderData:any = null;

  router = inject(Router)
  route = inject(ActivatedRoute)
  orderNumber:any ; 
  amount:any ; 


  ngOnInit(): void {
   

     this.route.queryParams.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      this.amount = parseFloat(params['amount']);
    });
  
  }

  continueShopping(): void {
    this.router.navigate(['/']); 
  }

  goToOrders(): void {
    this.router.navigate(['/orders']); 
  }

}
