import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

/**
 * Functional guard which checks if the user is currently logged in.
 */
export const isAuthenticatedGuard = () => {
  const service = inject(AuthService);

  return service.isLoggedIn();
};
