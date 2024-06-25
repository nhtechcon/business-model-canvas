import { Injectable } from "@angular/core";
import {
  ApiAuthService,
  CanvasService,
  Token,
  UserService,
} from "./api-client";
import { isBefore, parseISO } from "date-fns";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private KEY_ACCESS_TOKEN = "access_token";
  private KEY_EXPIRES_AT = "expires_at";
  private KEY_TOKEN_INFO = "token_info";

  private AUTH_CONFIGURATION_NAME = "OAuth2PasswordBearer";

  constructor(
    private authApi: ApiAuthService,
    private userApi: UserService,
    private canvasApi: CanvasService
  ) {
    this.injectTokenOnStartup();
  }

  /**
   * Performs login. If successful, stores token in local storage and injects
   * it into the api client.
   */
  login(username: string, password: string): Observable<Token> {
    return this.authApi
      .loginForAccessTokenApiLoginPost({ username, password })
      .pipe(
        tap(tokenInfo => {
          this.setSession(tokenInfo);
          this.injectToken(tokenInfo.access_token);
        })
      );
  }

  /**
   * Stores the token information in the local storage.
   */
  private setSession(tokenInfo: Token) {
    localStorage.setItem(this.KEY_TOKEN_INFO, JSON.stringify(tokenInfo));
    localStorage.setItem(this.KEY_ACCESS_TOKEN, tokenInfo.access_token);
    localStorage.setItem(this.KEY_EXPIRES_AT, tokenInfo.expires_at);
  }

  /**
   * Injects the token into the api services.
   */
  private injectToken(token: string) {
    this.userApi.configuration.credentials[this.AUTH_CONFIGURATION_NAME] =
      token;
    this.canvasApi.configuration.credentials[this.AUTH_CONFIGURATION_NAME] =
      token;
  }

  /**
   * Removes token information from local storage.
   */
  public logout() {
    localStorage.removeItem(this.KEY_ACCESS_TOKEN);
    localStorage.removeItem(this.KEY_EXPIRES_AT);
    localStorage.removeItem(this.KEY_TOKEN_INFO);
  }

  /**
   * Returns true, if the user's token is still valid.
   */
  public isLoggedIn() {
    const expiresAt = localStorage.getItem(this.KEY_EXPIRES_AT);
    if (!expiresAt) return false;

    return isBefore(new Date(), parseISO(expiresAt));
  }

  /**
   * Reads the token from local storage, and injects it into the api services.
   */
  private injectTokenOnStartup() {
    if (!this.isLoggedIn()) {
      this.logout();
      return;
    }
    const token = localStorage.getItem(this.KEY_ACCESS_TOKEN);
    if (!token) {
      this.logout();
    } else {
      this.injectToken(token);
    }
  }
}
