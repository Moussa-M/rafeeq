import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";
import { environment } from "../../environments/environment";
const { SERVER_PORT, BASE_URL } = environment;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  token: string;

  constructor(private http: HttpClient, private oktaAuth: AuthService) {}

  resolveStores(): Observable<any> {
    return this.http.get(`${BASE_URL}:${SERVER_PORT}/api/stores`);
  }
  resolveCustomers(): Observable<any> {
    return this.http.get(`${BASE_URL}:${SERVER_PORT}/api/users`);
  }
  resolveOrders(): Observable<any> {
    return this.http.get(`${BASE_URL}:${SERVER_PORT}/api/orders`);
  }
  resolveAnalysis(): Observable<any> {
    return this.http.get(`${BASE_URL}:${SERVER_PORT}/api/analysis`);
  }
}
