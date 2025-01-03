import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectModule} from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputBoxComponent } from '../../components/input-box/input-box.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AddPinComponent } from './add-pin.component';
import { SelectBoxComponent } from '../../components/select-box/select-box.component';


@NgModule({
  declarations: [AddPinComponent],
   imports: [
    InputBoxComponent,
    SelectBoxComponent,
    CommonModule,
      NgxSelectModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule
    ],
    exports:[AddPinComponent]
})
export class AddPinModule { }
