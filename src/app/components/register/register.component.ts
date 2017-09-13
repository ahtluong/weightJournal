import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:string;
  username:string;
	email:string;
	password:string;

  constructor(
   	private authService:AuthService,
  	private router:Router,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit({valid,value}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields.', { cssClass:'alert-danger', timeout:3000 });
      this.router.navigate(['/register']);
    } else {
      if (!this.isValid(this.username)) {
        this.flashMessagesService.show('Usernames cannot contain special characters.', { cssClass:'alert-danger', timeout:3000 });
        this.router.navigate(['/register']);   
      } else {
        this.authService.checkUsername(this.username).subscribe(res => {
          if (res.$value != null) {
            this.flashMessagesService.show('This username is already taken.', { cssClass:'alert-danger', timeout:3000 });
            this.router.navigate(['/register']);
          } else this.registerAccount();
        });
      }
    }
  }

  registerAccount() {
    this.authService.register(this.email, this.password)
      .then((res) => {
        this.flashMessagesService.show('Account created', { cssClass:'alert-success', timeout:3000 });
        this.authService.setNewUser(this.name, this.username, this.email);
        this.authService.setName(this.name);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessagesService.show(err.message, { cssClass:'alert-danger', timeout:3000 });
        this.router.navigate(['/register']);
      })
  }

  isValid(str) {
    return !/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

}
