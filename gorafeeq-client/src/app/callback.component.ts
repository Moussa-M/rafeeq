import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component( {template:''})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.handleAuthentication();
  }
}