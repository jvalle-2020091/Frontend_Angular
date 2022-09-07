import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
 import {MatStepperModule} from '@angular/material/stepper';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import { MatButtonModule} from '@angular/material/button';
 import {MatInputModule} from '@angular/material/input';
 import {MatCheckboxModule} from '@angular/material/checkbox';
 import { ReactiveFormsModule } from '@angular/forms';
 import { MatTableModule } from '@angular/material/table';




// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ToggleButtonModule,
        StepsModule,
        CardModule,
        MatStepperModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatTableModule
        
    ],
    
    declarations: [CrudComponent],
    
})
export class CrudModule { }
