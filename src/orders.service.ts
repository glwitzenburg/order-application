import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  iterator = 0;
  mockOrder = {id: 10, name: 'test', price: 0.00}
  mockUpdate = {id: 1, name: 'updatedName', price: 15.00}

  private ordersUrl: string = 'https://localhost:44394';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(this.ordersUrl + '/orders')
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put(this.ordersUrl + '/orders/' + this.mockUpdate.id, this.mockUpdate)
  }

  createNewOrder(object: any): Observable<any> {
    this.mockOrder.name = this.mockOrder.name + String(this.iterator);
    this.iterator++;
    return this.http.post(this.ordersUrl + '/orders', this.mockOrder)
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(this.ordersUrl + '/orders/' + orderId)
  }
}
