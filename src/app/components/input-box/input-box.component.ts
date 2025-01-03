import { NgClass } from '@angular/common';
import { Component,input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {

  labelName=input.required<string>()
  required=input.required<Boolean>()
  control =input.required<FormControl>()

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
