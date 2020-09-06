import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { NotifierModule } from 'angular-notifier';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';

// Our Modules
import { SharedRoutingModule } from './shared-routing.module';

// Our Components
import { PrimaryMenuComponent } from './primary-menu/primary-menu.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './video/video.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedRoutingModule,
        BlockUIModule.forRoot(),
        RecaptchaModule.forRoot({
            siteKey: "6Le30ZEUAAAAAP2_MqjfzHfO6chbSO7RQWdutjfr"
        }),
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: "right"
                },
                vertical: {
                    position: "top"
                }
            }
        })
    ],
    exports: [
        PrimaryMenuComponent,
        FooterComponent,
        VideoComponent
    ],
    declarations: [
        PrimaryMenuComponent,
        FooterComponent,
        VideoComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
