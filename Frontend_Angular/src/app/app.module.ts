import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NeedPasswordComponent } from './demo/components/need-password/need-password.component';
import { TranslocoRootModule } from './transloco-root.module'
import { AccessComponent } from '../../src/app/demo/components/auth/access/access.component'



import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http, '../assets/i18n/')
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, NeedPasswordComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule, 
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        TranslocoRootModule,
        TranslateModule.forRoot({
            loader:{
                provide:TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }