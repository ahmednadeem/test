import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SharedService } from '../services/shared.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerList: any[] = [];

  constructor(private service: SharedService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerList = this.service.getAllCustomer();
  }

  onEdit(data: any) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.getAllCustomer();
      }
    });
  }

  onDelete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteCustomer(id);
        this.service.getAllCustomer();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.service.getAllCustomer();
    });
  }

}
