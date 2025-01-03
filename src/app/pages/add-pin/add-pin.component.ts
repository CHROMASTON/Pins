import { Component, OnInit,inject,Signal } from '@angular/core';
import {INgxSelectOption} from 'ngx-select-ex';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Customer,PinForm } from '../../types/types';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-add-pin',
  standalone: false,
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.css'
})
export class AddPinComponent implements OnInit{
  uploader:FileUploader;

  // customersList:Customer[]=[]
    dataService=inject(DataServiceService)
    customersList:Signal<Customer[]>=this.dataService.customerList
  imgdata:any=''

  createPinForm =new FormGroup({

    title: new FormControl<string>('',{validators:[Validators.required]}),
    image: new FormControl<File|string>('',{validators:[Validators.required]}),
    collaburators: new FormControl<string[]>([],{validators:[Validators.required]}),
    privacy: new FormControl<'private'|'public'>('private',{validators:[Validators.required]}),

  })


  public ngxValue: any = [];
  public ngxDisabled = false;



  constructor (){
    this.uploader = new FileUploader({
      url: '', 
      disableMultipart: true, 
      allowedFileType:['image'],
      allowedMimeType: ['image/png', 'image/jpeg', 'image/gif'],
      isHTML5: true,
      autoUpload: false
    });

  }


  ngOnInit(): void {
      // this.customersList=JSON.parse(localStorage.getItem('customersList')||'[]')
      this.dataService.loadCustomersFomLocalStorage()

      console.log(this.dataService.pinList());
      
  }

  savePin(){
    const data ={
      title:this.createPinForm.value.title ,
      image: this.createPinForm.value.image ,
      collaburators: this.createPinForm.value.collaburators ,
      privacy: this.createPinForm.value.privacy      
    }
    this.dataService.updatePinsList(data as PinForm)

    this.createPinForm.reset()

    
  }

  setImageData(data:File[]){

    const file=data[0]
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imgdata = e.target.result; 
      this.createPinForm.controls.image.setValue(this.imgdata)

    };
  
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  
    reader.readAsDataURL(file); 
    
  }

  

}
