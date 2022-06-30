import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { OrdersService } from 'src/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'order-application';
  deleteOrders$: Observable<any> | undefined;
  getAllOrders$: Observable<any> | undefined;
  iterator = 0;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.deleteOrders$ = this.orderService.deleteOrder(2);
    this.getAllOrders$ = this.orderService.getAllOrders();
  }

  test() {
    this.orderService.createNewOrder(null).subscribe(value =>console.log(value))
  }

  updateOrder() {
    this.orderService.updateOrder(null).pipe(
      switchMap(value => {
        return this.getAllOrders$ = this.orderService.getAllOrders();
      })
    )
    .subscribe(value => console.log(value))
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.iterator).pipe(
      switchMap(value => {
        return this.getAllOrders$ = this.orderService.getAllOrders();
      })
    )
    .subscribe(value => this.iterator++);
  }
}
