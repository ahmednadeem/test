import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  addForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: any;
  authenticated = true;
  previousData: any;

  constructor(private customerService: SharedService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>) {
    if (data) {
      this.previousData = data;
    }
  }

  ngOnInit(): void {
    this.resetAddForm();
    this.addForm.get('firstName').setValue(this.data.firstName);
    this.addForm.get('lastName').setValue(this.data.lastName);
  }

  resetAddForm() {
    this.addForm = this.formBuilder.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }
  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    else {
      let id = this.data.id;
      let firstName = this.addForm.value.firstName;
      let lastName = this.addForm.value.lastName;

      let data = {
        'id': id,
        'firstName': firstName,
        'lastName': lastName
      }
      this.customerService.updateCustomer(data);
      this.dialogRef.close();
    }
  }

}
