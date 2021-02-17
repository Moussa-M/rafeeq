import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  stores : any []
  constructor(public apiService:ApiService,public auth : AuthService) {

   }
  async ngOnInit() {

    this.apiService.resolveStores().subscribe((val)=>{
      this.stores = val
    })
  }

}
