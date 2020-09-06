import { Component, OnInit } from '@angular/core';
import { SignUpViewModel } from '../../core/api-models/sign-up-view-model';
import { environment } from 'src/environments/environment';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { NotifierService } from 'angular-notifier';
import * as $ from "jquery";
import { LoginResponseData } from '../../core/api-models/login-response-data';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AppStateService } from '../../core/appservices/app-state.service';
import { LoginViewModel } from '../../core/api-models/login-view-model';
import { AppEvents } from 'src/app/models/appenums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-menu',
  templateUrl: './primary-menu.component.html',
  styleUrls: ['./primary-menu.component.scss']
})
export class PrimaryMenuComponent implements OnInit {
  public showModal = false;
  public isLogin = false;
  public isAdmin = false;
  public showErrMsg = true;
  public showSuccessModal = false;
  public user_authorized: boolean;
  public recaptchaLoaded: boolean;
  public recaptchaResult: boolean;
  public inviteEmail: string;
  public errorMessage: string;
  public username: string;
  public wallet_balance: string;
  public loginModel: LoginViewModel;
  public signupModel: SignUpViewModel;
  public searchQuery: string;
  errorClasses: { active: boolean; error: boolean };
  form: { email: string; password: string; rememberMe: boolean };
  signupForm: { username: string; email: string; password: string; confirm_password: string; referral: string; };

  constructor(public authenticateService: AuthenticationService, public appStateService: AppStateService,
    public accountService: AppAccountService, private notifier: NotifierService, private router: Router) {

    this.recaptchaResult = false;
    this.recaptchaLoaded = false;
    this.form = { email: '', password: '', rememberMe: false };
    this.signupForm = { username: '', email: '', password: '', confirm_password: '', referral: '' };

    if (this.authenticateService.authenticated) {           // see if user is logged in...
      this.form.email = this.authenticateService.email;     // login via access token
      this.onSignInToken(this.authenticateService.email, this.authenticateService.token, this.authenticateService.name, this.authenticateService.isAdmin);
    } else {
      this.logout();
    }
  }

  ngOnInit() {
    // $(".login-toggle").on("click", function (e) {
    // debugger;
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   $(".user-form").toggleClass("form-open");
    // });
    $("#signUp-frm-button").on("click", function () {
      $(".login-form").removeClass("form-active");
      $(".signUp-form").addClass("form-active");
    });
    $("#login-frm-button").on("click", function () {
      $(".signUp-form").removeClass("form-active");
      $(".login-form").addClass("form-active");
    });
  }

  loginClick() {
    this.isLogin = true;
    $("#wrapper").toggleClass("toggled");
    $(".user-form").toggleClass("form-open");
  }

  login() {
    this.errorClasses = { active: false, error: false };
    this.loginModel = {
      email: this.form.email,
      password: this.form.password
    };
    const loginSubscribe = this.accountService.login(this.loginModel).subscribe(res => {
      if (res.statusCode === 200) {
        const currentUser = res.data;
        if (res.data.role === 'ADMIN') {
          this.isAdmin = true;
        }
        this.onLoginSuccess(currentUser);
        const username = (currentUser.name === null || currentUser.name === '' || currentUser.name === undefined) ?
          currentUser.email : currentUser.name;
        this.notifier.notify("success", `Welcome to Refine Medium ${username} !`);
        const walletSubscribe = this.accountService.createWallet().subscribe(result => {
          walletSubscribe.unsubscribe();
          if (loginSubscribe) {
            loginSubscribe.unsubscribe();
          }
        });
        if (loginSubscribe) {
          loginSubscribe.unsubscribe();
        }
        this.router.navigateByUrl('profile');
        $("#wrapper").toggleClass("toggled");
        $(".user-form").toggleClass("form-open");
      }
    }, err => {
      const error = err.error;
      if (error.message === 'Bad credentials') {
        this.notifier.notify("error", "Invalid Email or Password");
      } else if (error.message === 'User is disabled') {
        this.notifier.notify("error", "Your email address is not verified. Please check your inbox.");
      }
      loginSubscribe.unsubscribe();
      // this.errorMessage = err.message;
      // this.errorClasses = { active: true, error: true };
      // console.log("Something went wrong:", err.message);
    });
    this.form.email = this.form.password = "";
  }

  onLoginSuccess(currentUser) {
    this.appStateService.sendEvent(AppEvents.LoggedIn, true);
    this.appStateService.sendEvent(AppEvents.SetUser, currentUser);
    this.authenticateService.token = currentUser.token;
    this.authenticateService.email = currentUser.email;
    this.authenticateService.name = currentUser.name;
    this.authenticateService.isAdmin = currentUser.isAdmin;
    if (currentUser.isAdmin) {
      this.isAdmin = true;
    }
    const username = (currentUser.name === null || currentUser.name === '' || currentUser.name === undefined) ?
      currentUser.email : currentUser.name;

    this.user_authorized = currentUser != null;
    if (this.user_authorized) {
      this.username = username;
      this.wallet_balance = currentUser.balance.toString();
      this.isAdmin = currentUser.isAdmin;
    }

    // $("#wrapper").toggleClass("toggled");
    // $(".user-form").toggleClass("form-open");
  }

  logout() {
    this.appStateService.sendEvent(AppEvents.LoggedIn, false);
    this.appStateService.sendEvent(AppEvents.SetUser, null);

    this.authenticateService.logoff();
    this.user_authorized = false;
    if (this.user_authorized) {
      this.username = '';
    }
    this.router.navigateByUrl('/');

  }

  reset() {
    this.errorClasses = { active: false, error: false };
    this.errorMessage = "";
    this.form = { email: "", password: "", rememberMe: false };
    this.signupForm = { username: '', email: '', password: '', confirm_password: '', referral: '' };
  }

  onSignInToken(email, token, name, isAdmin) {
    let currentUser: LoginResponseData;
    currentUser = {
      address: '',
      balance: 0,
      email: email,
      isAdmin: isAdmin,
      name: name,
      role: '',
      token: token
    };

    this.onLoginSuccess(currentUser);
  }

  showLoginModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    window.scrollTo(500, 0);
    this.showModal = true;
  }

  onScriptLoad() {
    this.recaptchaLoaded = true;
  }

  onScriptError() {
    console.log("Something went long when loading the Google reCAPTCHA");
    this.recaptchaLoaded = false;
  }

  signup() {
    this.errorClasses = { active: false, error: false };
    if (this.signupForm.password !== this.signupForm.confirm_password) {
      this.errorMessage = "Passwords do not match.";
      this.errorClasses = { active: true, error: true };
    } else if (this.recaptchaLoaded == false) {
      this.errorMessage = "Recaptcha loading failed. Try again later.";
      this.errorClasses = { active: true, error: true };
    } else if (this.recaptchaResult == false) {
      this.errorMessage = "Recaptcha verification failed.";
      this.errorClasses = { active: true, error: true };
    } else {
      let that = this;
      this.signupModel = {
        email: this.signupForm.email,
        password: this.signupForm.password,
        webUrl: environment.webRedirectUrl,
        referrerCode: this.signupForm.email === '' ? null : this.signupForm.referral
      };
      const singUpSubscribe = this.accountService.signUp(this.signupModel).subscribe(res => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          this.notifier.notify("success", "Signup successful. Check your e-mail to verify your account.");
          $("#wrapper").toggleClass("toggled");
          $(".user-form").toggleClass("form-open");
        }
        singUpSubscribe.unsubscribe();
      }, err => {
        this.errorMessage = err.message;
        this.errorClasses = { active: true, error: true };
        console.log("Something went wrong:", err.message);
      });
    }
  }

  enableLogin() {
    this.isLogin = true;
  }

  // inviteUser() {
  //   var invite = prompt("Enter the email address of your friend");
  //   if (invite === '' || invite === null || invite === undefined) {
  //     return;
  //   }
  //   const inviteSubscribe = this.accountService.inviteUser(invite).subscribe(res => {
  //     this.notifier.notify("success", "Invite sent successfully");
  //     inviteSubscribe.unsubscribe();
  //   });
  // }

  comingSoon() {
    alert("This Section is Under Development and Coming Soon!");
  }

  closeLogin() {
    // this.isLogin = false;
    $("#wrapper").toggleClass("toggled");
    $(".user-form").toggleClass("form-open");
  }

  showInviteModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    window.scrollTo(500, 0);
    this.showModal = true;
  }

  showComingSoonModal() {
    this.showSuccessModal = true;
  }

  closeModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    this.showModal = false;
    this.showSuccessModal = false;
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

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  searchVideos() {

  }
}
