import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { AuthService } from './services/auth.service';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService, AuthService],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  token : string;
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    public auth: AuthService,
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
    
  }

  async ngOnInit() {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    // this.auth.$isAuthenticated.subscribe((val) => {
    //   if(val){
    //     this.router.redire
    //   }
    // });
    
    
  }


}
