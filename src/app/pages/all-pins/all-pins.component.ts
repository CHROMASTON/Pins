import { Component,OnInit,computed,inject } from '@angular/core';
import { CreateCustomerModule } from '../create-customer/create-customer.module';
import { AddPinModule } from '../add-pin/add-pin.module';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-all-pins',
  standalone: true,
  imports: [CreateCustomerModule,AddPinModule],
  templateUrl: './all-pins.component.html',
  styleUrl: './all-pins.component.css'
})
export class AllPinsComponent implements OnInit {

  dataService=inject(DataServiceService)
  allPins=this.dataService.pinList 


  ngOnInit(): void {
    this.dataService.loadPinsFomLocalStorage()


      
  }

  generateImageUrl(file:File){


    const reader = new FileReader();
    let imageUrl:string;

    reader.onload = (e: any) => {
      imageUrl = e.target.result;  // This is the Data URL
    };
  
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  
    reader.readAsDataURL(file); 

  }

}
