import { Component, OnInit } from "@angular/core";
import { MainService } from "../services/main.service";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.products$ = this.mainService.getProducts()
    
  }
}
