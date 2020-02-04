import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formRegister = this.fb.group(
    {
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      mobilephone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password1: ["", [Validators.required, Validators.minLength(6)]],
      password2: ["", [Validators.required, Validators.minLength(6)]]
    },
    { validator: this.matchingPasswords }
  );

  states = ["MG", "RS", "SP", "GO", "BH"];

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private snackbar: MatSnackBar,
    private router : Router
  ) {}

  ngOnInit() {}

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls["password1"].value;
      const password2 = group.controls["password2"].value;
      if (password1 == password2) {
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit() {
    let u: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1
    };
    this.authServ.register(u).subscribe(
      u => {
        console.log("ok", u);
        this.snackbar.open("registro efetuado com sucesso", "ok", {duration: 3000});
        this.router.navigateByUrl('/auth/login')
      },
      error => {
        console.log(error);
        this.snackbar.open(error.error.message, "fechar", {duration: 3000})

      }
    );
  }
}
