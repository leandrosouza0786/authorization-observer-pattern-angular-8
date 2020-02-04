import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService, private route : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(authReq).pipe(
        catchError(err => {
          console.log("in", err);
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.authService.logout();
              this.route.navigateByUrl('/auth/login');
            }
          }
          return throwError(err);
        })
      );
    }
    return next.handle(req);
  }
}
