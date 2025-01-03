import { Component,inject, signal,DestroyRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryRegionService } from '../../services/country-region.service';
import { Customer } from '../../types/types'
import { DataServiceService } from '../../services/data-service.service';


@Component({
  selector: 'app-create-customer',
  standalone: false,
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {

  countryRegionService=inject(CountryRegionService)
  distroyRef=inject(DestroyRef)
  regionOptions=signal<{key:string,value:string}[]>([])
  countryList=signal<{key:string,value:string,region:string}[]>([])
  allCountryList:{key:string,value:string,region:string}[]=[]
  dataService=inject(DataServiceService)
  customersList=this.dataService.customerList


  isUnique(control:AbstractControl){
      const emailFound =this.customersList().some((customer)=>customer.email==control.value)
      if(emailFound){
        return {notUnique:true}
      }
      else{
        return null
      }

  }


  createCustomerForm = new FormGroup({

    title:new FormControl<string>('',{validators:[Validators.required]}),
    email:new FormControl<string>('',{validators:[Validators.required,Validators.email,this.isUnique.bind(this)]}),
    region:new FormControl<string>('',{validators:[Validators.required]}),
    country:new FormControl<string>({value: '', disabled: true},{validators:[Validators.required]})

  })

  ngOnInit(){
  
  this.dataService.loadCustomersFomLocalStorage()
  

  const regionSubscription=  this.countryRegionService.getRegions().subscribe({
      next:(response)=>{
        this.regionOptions.set(response.oprtionList)
        this.allCountryList=response.response
      
      },
      
      
    })

    const formSubscription=this.createCustomerForm.controls.region.valueChanges.subscribe((region)=>{

      this.countryList.update(()=>this.allCountryList.filter((country)=>country.region===region))
      this.createCustomerForm.get('country')?.reset()

      if(this.createCustomerForm.controls.region.invalid){
        this.createCustomerForm.get('country')?.disable()

      }
      else{
        this.createCustomerForm.get('country')?.enable()
      }


    })

    this.distroyRef.onDestroy(()=>{
      regionSubscription.unsubscribe()
      formSubscription.unsubscribe()
    })

  }

  saveCustomer():void{

      this.dataService.updateCustomerList(this.createCustomerForm.value as Customer)
      this.createCustomerForm.reset()
    
    
  }

 



}
