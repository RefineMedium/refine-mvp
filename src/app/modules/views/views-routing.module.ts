import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchComponent } from './watch/watch.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { BrowseComponent } from './browse/browse.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "browse", component: BrowseComponent },
    { path: "watch", component: WatchComponent },
    { path: "upload", component: UploadComponent },
    { path: "about", component: AboutComponent },
    { path: "search", component: SearchComponent },
    { path: "profile", component: ProfileComponent },
    { path: "user-profile", component: UserProfileComponent },
    { path: "dashboard", component: AdminDashboardComponent },
    { path: "forgot", component: ForgotPasswordComponent },
    { path: "reset", component: ResetPasswordComponent },
    { path: "verify", component: VerifyUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule { }