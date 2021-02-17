import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers : any []
  constructor(public apiService:ApiService) {

   }
  async ngOnInit() {
    this.apiService.resolveCustomers().subscribe((val)=>{
      this.customers = val
    })
  }
}
