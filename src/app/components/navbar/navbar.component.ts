import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	isLoggedIn:boolean;
	loggedInUser:string;

  constructor(
  	private authService:AuthService,
  	private router:Router,
  ) { }

  ngOnInit() {
  	this.authService.getAuth().subscribe(auth => {
  		if (auth) {
  			this.isLoggedIn = true;
  			this.loggedInUser = auth.email;
  		} else {
  			this.isLoggedIn = false;
  		}
  	});
  }

  onNameClick() {
    this.authService.getAuth().subscribe(auth => {
      if (this.loggedInUser == auth.email)
        this.loggedInUser = auth.displayName;
      else
        this.loggedInUser = auth.email; 
    });
  }

  onLogoutClick() {
  	this.authService.logout();
  	this.router.navigate(['/login']);
  }

}
