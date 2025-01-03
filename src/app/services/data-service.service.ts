import { Injectable, signal } from '@angular/core';
import { Customer,Pin,PinForm } from '../types/types'


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private customerListSignal=signal<Customer[]>([])
  customerList =this.customerListSignal.asReadonly()

  private pinListSignal=signal<Pin[]>([])
  pinList =this.pinListSignal.asReadonly()

  constructor() { }

  loadCustomersFomLocalStorage() {
    try {
      const value = localStorage.getItem('customersList');
      
      const list= value ? JSON.parse(value) : [];

      this.customerListSignal.set(list)
      

    } catch (error) {
      console.log('error while fetching customers');
      
    }
  }
  updateCustomerList(value:Customer){

    this.customerListSignal.update((list)=>{
      return [...list,value]

    })

    localStorage.setItem('customersList',JSON.stringify(this.customerListSignal()))


    
  }

  loadPinsFomLocalStorage() {
    try {
      const value = localStorage.getItem('pinList');
      const list= value ? JSON.parse(value) : [];
      this.pinListSignal.set(list)
      

    } catch (error) {
      console.log('error while fetching customers');
      
    }
  }
  updatePinsList(value:PinForm){

    let collaburatorsList:Customer[] =[]
    if(value.collaburators){
      for(let email of value?.collaburators){        

        collaburatorsList=[...collaburatorsList,...this.customerListSignal().filter((customer)=>customer.email===email)]

      }
    }

    const pin:Pin={...value,collaburators:collaburatorsList}


   
    this.pinListSignal.update((list)=>{
      return [...list,pin]

    })

    localStorage.setItem('pinList',JSON.stringify(this.pinListSignal()))


    
  }

}
