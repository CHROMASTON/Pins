import { Component,inject,input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {INgxSelectOption, NgxSelectModule} from 'ngx-select-ex';

import { NgClass } from '@angular/common';


@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgxSelectModule],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.css'
})
export class SelectBoxComponent {


  labelName=input.required<string>()
  required=input.required<Boolean>()
  control =input.required<FormControl>()
  optionsList = input.required<any[]>()
  key=input<string>('key')
  value=input<string>('value')
  isDisabled=input<boolean>(false)
  multiple=input<boolean>(false)

  
    get isInvalid(){
      return this.control().invalid  && this.control().dirty 
    }
  
    get validationClasses(){
      return {
        'is-valid':this.control().valid,
        'is-invalid':this.control().touched && this.control().invalid
      }
    }

    

}
