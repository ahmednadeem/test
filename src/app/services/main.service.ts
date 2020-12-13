import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private userLoggedIn = new BehaviorSubject<boolean>(false);
  constructor() { }

  getLoggedInStatus() {
    return this.userLoggedIn.value;
  }

  setLoggedInStatus(value: any) {
    this.userLoggedIn.next(value);
  }
}
