import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from "angular-notifier";
import { BlockUIModule } from "ng-block-ui";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AngularDropdownModule } from "angular-dropdown";

// Our Modules
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../shared/shared.module';

// Our Components
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WatchComponent } from './watch/watch.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { UploadComponent } from './upload/upload.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ViewsRoutingModule,
        NgxDropzoneModule,
        AngularDropdownModule,
        SharedModule,
        BlockUIModule.forRoot(),
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
    ],
    declarations: [
        WatchComponent,
        WrapperComponent,
        UploadComponent,
        AboutComponent,
        SearchComponent,
        HomeComponent,
        BrowseComponent,
        UserProfileComponent,
        AdminDashboardComponent,
        ProfileComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        VerifyUserComponent
    ]
})
export class ViewsModule { }
