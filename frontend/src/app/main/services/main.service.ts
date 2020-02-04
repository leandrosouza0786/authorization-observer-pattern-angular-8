import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Person } from "../models/person";
import { Product } from "../models/product";

import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class MainService {

  constructor(private http: HttpClient) {}

  readonly url = "http://localhost:3000/api";

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`).pipe(
      catchError(e => this.handlingError(e))
   );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
       catchError(e => this.handlingError(e))
    );
  }

  handlingError(e){
      return throwError(e);
  }
}
