import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetRegisterForm();
  }

  resetRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm ? this.registerForm.controls : null; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm?.invalid) {
      return;
    }

    this.loading = true;
    let username = this.registerForm?.value.username;
    let pass = this.registerForm.value.password;
    localStorage.setItem(username, pass);
    this.loading = false;
    this.router.navigate(['/login']);
  }


}
