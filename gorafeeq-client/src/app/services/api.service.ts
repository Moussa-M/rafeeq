import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";
import { environment } from "../../environments/environment";
const { BASE_SERVER_URL, BASE_URL } = environment;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  token: string;

  constructor(private http: HttpClient, private oktaAuth: AuthService) {}

  resolveStores(): Observable<any> {
    return this.http.get(`${BASE_SERVER_URL}/api/stores`);
  }
  resolveCustomers(): Observable<any> {
    return this.http.get(`${BASE_SERVER_URL}/api/users`);
  }
  resolveOrders(): Observable<any> {
    return this.http.get(`${BASE_SERVER_URL}/api/orders`);
  }
  resolveAnalysis(): Observable<any> {
    return this.http.get(`${BASE_SERVER_URL}/api/analysis`);
  }
}
