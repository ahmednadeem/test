import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  Customers: any[] = [
    {
      'id': 1,
      'firstName': 'test1',
      'lastName': 'test1 Last'
    },
    {
      'id': 2,
      'firstName': 'test2',
      'lastName': 'test2 Last'
    }, {
      'id': 3,
      'firstName': 'test3',
      'lastName': 'test3 Last'
    }
  ];

  constructor() { }

  addCustomer(data: any): boolean {
    this.Customers.push(data);
    return true;
  }
  deleteCustomer(id: any): boolean {
    let customer = this.Customers.findIndex(x => x.id == id);
    if (customer !== -1) {
      this.Customers.splice(customer,1);
      return true;
    }
    return false;
  }
  updateCustomer(data: any): boolean {
    let customer = this.Customers.findIndex(x => x.id == data.id);
    if (customer !== -1) {
      this.Customers[customer].firstName = data.firstName;
      this.Customers[customer].lastName = data.lastName;
      return true;
    }
    return false;
  }
  getAllCustomer() {
    return this.Customers;
  }
  getCustomerById(id: any) {
    let customer = this.Customers.findIndex(x => x.id == id);
    return this.Customers[customer]
  }
}
