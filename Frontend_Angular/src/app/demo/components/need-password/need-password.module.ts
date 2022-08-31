import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeedPasswordComponent } from './need-password.component';
import {ButtonModule} from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';



@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        SplitButtonModule
    ],
    declarations: [NeedPasswordComponent]
})
export class NeedPaswordModule { }
