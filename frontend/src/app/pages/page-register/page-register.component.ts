import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  ApiAuthService,
  RegistrationRequest,
} from "src/app/core/services/api-client";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-page-register",
  templateUrl: "./page-register.component.html",
  styleUrls: ["./page-register.component.scss"],
})
export class PageRegisterComponent {
  registerForm = this.formBuilder.group({
    username: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: ["", [Validators.required, Validators.email]],
    password1: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiAuth: ApiAuthService,
    private toast: ToastService
  ) {}

  register() {
    if (!this.registerForm.valid) return;

    const formValues = this.registerForm.value;
    const requestData: RegistrationRequest = {
      email: formValues.email!,
      username: formValues.username!,
      password1: formValues.password1!,
      password2: formValues.password2!,
    };

    this.apiAuth.registerUserRegisterPost(requestData).subscribe({
      next: response => {
        this.toast.showToast({
          severity: "success",
          summary: "Success",
          detail: "User has been registered.",
        });

        this.router.navigate(["/login"]);
      },
      error: error => {
        this.toast.showToast({
          severity: "error",
          summary: "Oh no :/",
          detail: "Registration failed.",
        });
      },
    });
  }
}
