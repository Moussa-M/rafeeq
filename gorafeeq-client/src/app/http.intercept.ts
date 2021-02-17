import { Injectable, OnInit } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpClient,
} from "@angular/common/http";

import { from, Observable, of } from "rxjs";
import { AuthService } from "./services/auth.service";
import { switchMap } from "rxjs/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  constructor(public oktaAuth: AuthService) {
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const token = await this.oktaAuth.auth.tokenManager.getTokens();
    var request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.accessToken.value}`,
      },
    });
    return next.handle(request).toPromise();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

}
