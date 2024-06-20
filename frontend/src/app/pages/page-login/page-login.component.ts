import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-page-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.scss"],
})
export class PageLoginComponent {
  loginForm = this.formBuilder.group({
    username: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private toast: ToastService
  ) {}

  login() {
    const formValues = this.loginForm.value;
    if (!this.loginForm.valid || !formValues.password || !formValues.username) {
      return;
    }

    this.authSvc.login(formValues.username, formValues.password).subscribe({
      next: _ => {
        this.router.navigate(["/main"]);
      },
      error: _ => {
        this.toast.showToast({
          severity: "error",
          summary: "Login failed.",
          detail: "Please check your credentials.",
        });
      },
    });
  }
}
