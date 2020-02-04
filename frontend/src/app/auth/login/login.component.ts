import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    const credentials = this.loginForm.value;
    this.loading = true;
    this.authServ.login(credentials).subscribe(
      user => {
        this.loading = false;
        console.log(user),
          this.snackbar.open("Login realizado com sucesso", null, {
            duration: 3000
          }),
          this.router.navigateByUrl("/");
      },
      error => {
        this.loading = false;
        console.log(error),
        this.snackbar.open("Credencias invalidas", null, {
          duration: 3000
        })
      }
    );
  }
}
