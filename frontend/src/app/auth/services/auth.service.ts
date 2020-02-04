import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable, BehaviorSubject, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  readonly url = "http://localhost:3000/auth";

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials).pipe(
      tap((e: User) => {
        localStorage.setItem("token", e.token);
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(e);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem("token");
    if (token && !this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`).pipe(
      tap((u: User) => {
        if (u) {
          this.subjUser$.next(u);
          this.subjLoggedIn$.next(true);
        }
      }),
      map((u: User) => (u ? true : false)),
      catchError(errr => {
        this.logout();
        return of(false);
      })
    );
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem("token");
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
