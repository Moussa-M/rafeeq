import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders : any []
  constructor(public apiService:ApiService) {

   }
  async ngOnInit() {
    this.apiService.resolveOrders().subscribe((val)=>{
      this.orders = val
    })
  }
  showMsg(){
    Swal.fire({  
      icon: 'info',  
      title: 'Ohhhh :)',  
      text: 'Not implemented yet',  
    })  
  }

}
