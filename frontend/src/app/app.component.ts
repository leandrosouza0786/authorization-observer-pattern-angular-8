import { Component } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Observable } from "rxjs";
import { User } from './auth/models/user';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  autheticated$: Observable<boolean>;
  user$:Observable<User>;

  constructor(private authServ: AuthService, private route : Router) {
    this.autheticated$ = this.authServ.isAuthenticated();
    this.user$ = this.authServ.getUser();
  }

  logout(){
    this.authServ.logout();
    this.route.navigateByUrl('/auth/login')
  }
}
