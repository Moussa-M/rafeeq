import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";

import config from "../app.config";

import { environment } from "../../environments/environment";
const { LOGOUT_REDIRECT_URI } = environment;

@Injectable({ providedIn: "root" })
export class AuthService {
  auth = new OktaAuth(config.oidc);

  
  $isAuthenticated: Observable<boolean>;
  
  private observer: Observer<boolean>;
  constructor(private router: Router,) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then((val) => {
        observer.next(val);
      });
    });
  }
  

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.auth.tokenManager.get("accessToken"));
  }

  login(originalUrl) {
    // Save current URL before redirect
    sessionStorage.setItem("okta-app-url", originalUrl || this.router.url);

    // Launches the login redirect.
    this.auth.token.getWithRedirect({
      scopes: ["openid", "email", "profile"],
    });
  }

  async handleAuthentication() {
    const tokenContainer = await this.auth.token.parseFromUrl();
    this.auth.tokenManager.add("idToken", tokenContainer.tokens.idToken);
    this.auth.tokenManager.add(
      "accessToken",
      tokenContainer.tokens.accessToken
    );
    

    if (await this.isAuthenticated()) {
      if(this.observer == undefined){
        this.router.navigate(['/login'])
      }else{

        this.observer.next(true);
      }
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem("okta-app-url");
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.auth.signOut({
      postLogoutRedirectUri: LOGOUT_REDIRECT_URI,
    });
    
   }
}