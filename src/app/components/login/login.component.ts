import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account:string;
	email:string;
	password:string;

  constructor(
  	private authService:AuthService,
  	private router:Router,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.account.indexOf('@') > -1) {
      this.email = this.account;
      this.login();
    } else {
      this.authService.checkUsername(this.account).subscribe(res => {
        if (res.$value != null) {
          this.email = res.$value;
          this.login();
        } else {
          this.flashMessagesService.show('This username is not found.', { cssClass:'alert-danger', timeout:3000 });
          this.router.navigate(['/login']);
        }
      });
    }
  }

  login() {
  	this.authService.login(this.email, this.password)
  		.then((res) => {
        this.flashMessagesService.show('Logged in', { cssClass:'alert-success', timeout:3000 });
  			this.router.navigate(['/']);
  		})
  		.catch((err) => {
        this.flashMessagesService.show(err.message, { cssClass:'alert-danger', timeout:3000 });
  			this.router.navigate(['/login']);
  		});
  }
}
