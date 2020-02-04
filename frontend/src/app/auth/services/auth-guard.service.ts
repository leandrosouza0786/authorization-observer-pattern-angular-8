import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route : Router, private authServ : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean>{
    return this.authServ.isAuthenticated()
    .pipe(tap(e => {
      if(!e){
        this.route.navigateByUrl('/auth/login')
      }
    }))
  }
}
