import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  currentRoute: any;
  constructor(private route: ActivatedRoute, private router: Router, private authService: MainService) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.currentRoute = event.url;
        console.log('navigated to:', event.url);
        console.log('route state', event.state);
        console.log('');
      }
      // else if (event instanceof NavigationEnd) {
      //   // if u dont need the state, you could even use this event-type..
      // }
    });
  }

  logout(){
    this.authService.setLoggedInStatus(false);
    this.router.navigate(['/login']);
  }
}
