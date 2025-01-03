import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,  } from '@angular/forms';
import { InputBoxComponent } from '../../components/input-box/input-box.component';
import { SelectBoxComponent } from '../../components/select-box/select-box.component';
import { CreateCustomerComponent } from './create-customer.component';


@NgModule({
  declarations: [CreateCustomerComponent],
  imports: [CommonModule,ReactiveFormsModule,InputBoxComponent,SelectBoxComponent],
  exports:[CreateCustomerComponent]

})
export class CreateCustomerModule { }
