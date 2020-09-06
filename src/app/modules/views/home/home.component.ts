import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { NotifierService } from 'angular-notifier';
import { AppAccountService } from '../../core/appservices/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showModal = false;
  public isLogin = false;
  public showErrMsg = true;
  public inviteEmail: string;

  constructor(private authenticateService: AuthenticationService, private router: Router, private notifier: NotifierService,
    public accountService: AppAccountService) { }

  ngOnInit() {
    this.isLogin = this.authenticateService.authenticated;
  }

  loginToJoin() {
    if (!this.isLogin) {
      $("#wrapper").toggleClass("toggled");
      $(".user-form").toggleClass("form-open");
    } else {
      this.router.navigateByUrl('profile');
    }
  }

  goToBrowse() {
    this.router.navigateByUrl('browse');
  }

  inviteUserPopup() {
    if (!this.isLogin) {
      this.notifier.notify('error', 'Please Login to Invite Friends.');
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      window.scrollTo(500, 0);
      this.showModal = true;
    }
  }

  uploadVideos() {
    if (!this.isLogin) {
      this.notifier.notify('error', 'Please Login to Upload Videos.');
    } else {
      this.router.navigateByUrl('upload');
    }
  }

  closeModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    this.showModal = false;
  }

  validateEmail(email: string) {
    this.inviteEmail = email;
    this.showErrMsg = (this.inviteEmail === null || this.inviteEmail === undefined || this.inviteEmail === '');
  }

  inviteUser() {
    const inviteSubscribe = this.accountService.inviteUser(this.inviteEmail).subscribe(res => {
      this.showModal = false;
      this.notifier.notify("success", "Invite sent successfully");
      inviteSubscribe.unsubscribe();
    });
  }
}
