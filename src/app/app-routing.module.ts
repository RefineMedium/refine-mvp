import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { WatchComponent } from './modules/views/watch/watch.component';
import { UploadComponent } from './modules/views/upload/upload.component';
import { AboutComponent } from './modules/views/about/about.component';
import { SearchComponent } from './modules/views/search/search.component';
import { HomeComponent } from './modules/views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: "watch", component: WatchComponent },
  // { path: "upload", component: UploadComponent },
  // { path: "about", component: AboutComponent },
  // { path: "search", component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
