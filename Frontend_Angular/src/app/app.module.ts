import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NeedPasswordComponent } from './demo/components/need-password/need-password.component'

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, NeedPasswordComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule, 
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }