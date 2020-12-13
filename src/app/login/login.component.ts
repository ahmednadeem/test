import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: any;
  authenticated = true;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  resetLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let email = this.f.email.value;
    let pass = this.f.password.value;
    let auth = localStorage.getItem(email);
    if (auth) {
      if (auth == pass) {
        this.authenticated = true;
        this.mainService.setLoggedInStatus(true);
        this.router.navigate(['/customer']);
      }else{
        this.authenticated = false;
      }
    } else {
      this.authenticated = false;
    }
    this.loading = false;
  }

}
