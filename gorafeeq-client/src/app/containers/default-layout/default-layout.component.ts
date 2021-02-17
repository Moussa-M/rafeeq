import {Component,OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public isAuthenticated = false;
  public navItems = navItems;
  public email = ""
  public name = ""
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(public auth: AuthService) {
        
  }

  async ngOnInit() {
    this.auth.$isAuthenticated.subscribe((val) => {
      console.log(val)
      this.isAuthenticated = val;
      if(val){
        this.auth.auth.getUser().then((v)=>{
          this.email = v.email;
          this.name = v.name;
        }).catch(()=>{
           // alert('fdfdsflfjsdkl')
        })
      }
    });


   
    // this.userInfo().then((val) => {
    //   this.userInfoObserver.next(val);
    // }).catch((ex)=>{
    //   // console.log(ex);
    // })


    
  }
}
