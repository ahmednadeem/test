import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  addForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: any;
  authenticated = true;

  constructor(private customerService: SharedService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCustomerComponent>) { }

  ngOnInit(): void {
    this.resetAddForm();
  }

  resetAddForm() {
    this.addForm = this.formBuilder.group({
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
      let id = new Date().getMilliseconds();
      let firstName = this.addForm.value.firstName;
      let lastName = this.addForm.value.lastName;

      let data = {
        'id': id,
        'firstName': firstName,
        'lastName': lastName
      }
      this.customerService.addCustomer(data);
      this.dialogRef.close();
    }
  }
}
