import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RolesComponent } from './roles.component';
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
 import {TabViewModule} from 'primeng/tabview';
import { RolesRoutingModule } from './roles-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {AccordionModule} from 'primeng/accordion';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
 

export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http, '../../../../../assets/i18n/')
}


@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
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
        TabViewModule,
        HttpClientModule,
        MultiSelectModule,
        AccordionModule,
        TranslateModule.forRoot({
            loader:{
                provide:TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }) 
  ],

  declarations: [RolesComponent],

})
export class RolesModule { }
