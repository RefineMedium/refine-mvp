import { Component, OnInit } from "@angular/core";
// import { AuthService } from "../auth.service";
import * as $ from "jquery";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { WOW } from "wowjs/dist/wow.min";
// import {
//   AngularFirestoreCollection,
//   AngularFirestore
// } from "@angular/fire/firestore";
import { NotifierService } from "angular-notifier";
import { CookieService } from 'ngx-cookie-service';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { environment } from 'src/environments/environment';
import { SignUpViewModel } from '../../core/api-models/sign-up-view-model';
import { LoginViewModel } from '../../core/api-models/login-view-model';
import { AppStateService } from '../../core/appservices/app-state.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { LoginResponseData } from '../../core/api-models/login-response-data';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppEvents } from 'src/app/models/appenums';

@Component({
  selector: "app-root",
  templateUrl: "./wrapper.component.html",
  styleUrls: ["./wrapper.component.scss"]
})
export class WrapperComponent implements OnInit {
  searchQuery: string;
  errorMessage: string;
  cookieValue = 'UNKNOWN';
  isAddress: boolean = false;
  isLogin: boolean = false;
  errorClasses: { active: boolean; error: boolean };
  form: { email: string; password: string; rememberMe: boolean };
  signupForm: {
    email: string;
    password: string;
    confirm_password: string;
    referral: string;
  };
  // recaptchaLoaded: boolean;
  // recaptchaResult: boolean;
  // user_authorized: boolean;
  // username: string;
  // wallet_balance: string;
  // formData: { name: string; email: string; phone: number; message: string };
  submitted: boolean;
  // contactus: AngularFirestoreCollection<any>;
  signupModel: SignUpViewModel;
  // loginModel: LoginViewModel;
  @BlockUI() blockUI: NgBlockUI;

  constructor(/*public authService: AuthService,*/ public authenticateService: AuthenticationService, public appStateService: AppStateService,
    public accountService: AppAccountService, private router: Router, /*private firestore: AngularFirestore,*/ private notifier: NotifierService,
    private cookieService: CookieService) {

    // this.contactus = this.firestore.collection("contactus");
    // this.formData = { name: null, email: null, phone: null, message: null };
    // this.form = { email: "", password: "", rememberMe: false };
    // this.signupForm = {
    //   email: "",
    //   password: "",
    //   confirm_password: "",
    //   referral: ''
    // };
    // this.recaptchaResult = false;
    // this.recaptchaLoaded = false;
    // if (this.authenticateService.authenticated) {           // see if user is logged in...
    //   this.form.email = this.authenticateService.email;     // login via access token
    //   this.onSignInToken(this.authenticateService.email, this.authenticateService.token, this.authenticateService.name);
    // } else {
    //   this.logout();
    // }

    // authService.user.subscribe(user => {
    //   this.user_authorized = user != null;
    //   if (this.user_authorized) {
    //     this.username = user.email;
    //   }
    // });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        new WOW().init();
      });
  }

  // onScriptLoad() {
  //   this.recaptchaLoaded = true;
  // }

  // onScriptError() {
  //   console.log("Something went long when loading the Google reCAPTCHA");
  //   this.recaptchaLoaded = false;
  // }

  // login() {
  //   // this.authService.setPersistence(this.form.rememberMe);
  //   this.errorClasses = { active: false, error: false };
  //   this.loginModel = {
  //     email: this.form.email,
  //     password: this.form.password
  //   };
  //   const loginSubscribe = this.accountService.login(this.loginModel).subscribe(res => {
  //     if (res.statusCode === 200) {
  //       const currentUser = res.data;
  //       this.onLoginSuccess(currentUser);
  //       const username = (currentUser.name === null || currentUser.name === '' || currentUser.name === undefined) ?
  //         currentUser.email : currentUser.name;
  //       this.notifier.notify("success", `Welcome to Refine Medium ${username} !`);
  //       const walletSubscribe = this.accountService.createWallet().subscribe(result => {
  //         walletSubscribe.unsubscribe();
  //         if (loginSubscribe) {
  //           loginSubscribe.unsubscribe();
  //         }
  //       });
  //       if (loginSubscribe) {
  //         loginSubscribe.unsubscribe();
  //       }
  //     }
  //   }, err => {
  //     const error = err.error;
  //     if (error.message === 'Bad credentials') {
  //       this.notifier.notify("error", "Invalid Email or Password");
  //     } else if (error.message === 'User is disabled') {
  //       this.notifier.notify("error", "Your email address is not verified. Please check your inbox.");
  //     }
  //     loginSubscribe.unsubscribe();
  //     // this.errorMessage = err.message;
  //     // this.errorClasses = { active: true, error: true };
  //     // console.log("Something went wrong:", err.message);
  //   });
  //   // this.authService
  //   //   .login(this.form.email, this.form.password)
  //   //   .then(value => {
  //   //     if (!value.user.emailVerified) {
  //   //       this.authService.logout();
  //   //     } else {
  //   //       console.log("Login successful!");
  //   //       $("#wrapper").toggleClass("toggled");
  //   //       $(".user-form").toggleClass("form-open");
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     this.errorMessage = err.message;
  //   //     this.errorClasses = { active: true, error: true };
  //   //     console.log("Something went wrong:", err.message);
  //   //   });
  //   this.form.email = this.form.password = "";
  // }

  // onLoginSuccess(currentUser) {
  //   this.appStateService.sendEvent(AppEvents.LoggedIn, true);
  //   this.appStateService.sendEvent(AppEvents.SetUser, currentUser);
  //   this.authenticateService.token = currentUser.token;
  //   this.authenticateService.email = currentUser.email;
  //   this.authenticateService.name = currentUser.name;
  //   if (currentUser.isAdmin) {

  //   }
  //   const username = (currentUser.name === null || currentUser.name === '' || currentUser.name === undefined) ?
  //     currentUser.email : currentUser.name;

  //   this.user_authorized = currentUser != null;
  //   if (this.user_authorized) {
  //     this.username = username;
  //     this.wallet_balance = currentUser.balance.toString();
  //   }

  //   $("#wrapper").toggleClass("toggled");
  //   $(".user-form").toggleClass("form-open");
  // }

  // onSignInToken(email, token, name) {
  //   let currentUser: LoginResponseData;
  //   currentUser = {
  //     address: '',
  //     balance: 0,
  //     email: email,
  //     isAdmin: false,
  //     name: name,
  //     role: '',
  //     token: token
  //   };

  //   this.onLoginSuccess(currentUser);
  //   // // route to dashboard first, then login again to get profile
  //   // // this.router.navigateByUrl('/dashboard');
  //   // this.loginService.loginUserToken(email, token).subscribe(
  //   //   loginResult => {
  //   //     this.onLoginSucess(loginResult, true);
  //   //   }
  //   // );
  // }

  // signup() {
  //   this.errorClasses = { active: false, error: false };
  //   if (this.signupForm.password !== this.signupForm.confirm_password) {
  //     this.errorMessage = "Passwords do not match.";
  //     this.errorClasses = { active: true, error: true };
  //     // } else if (this.recaptchaLoaded == false) {
  //     //   this.errorMessage = "Recaptcha loading failed. Try again later.";
  //     //   this.errorClasses = { active: true, error: true };
  //     // } else if (this.recaptchaResult == false) {
  //     //   this.errorMessage = "Recaptcha verification failed.";
  //     //   this.errorClasses = { active: true, error: true };
  //   } else {
  //     let that = this;
  //     this.signupModel = {
  //       email: this.signupForm.email,
  //       password: this.signupForm.password,
  //       webUrl: environment.webRedirectUrl,
  //       referrerCode: this.signupForm.email === '' ? null : this.signupForm.referral
  //     };
  //     const singUpSubscribe = this.accountService.signUp(this.signupModel).subscribe(res => {
  //       if (res.statusCode === 200 || res.statusCode === 201) {
  //         this.notifier.notify("success", "Signup successful. Check your e-mail to verify your account.");
  //         $("#wrapper").toggleClass("toggled");
  //         $(".user-form").toggleClass("form-open");
  //       }
  //       singUpSubscribe.unsubscribe();
  //     }, err => {
  //       this.errorMessage = err.message;
  //       this.errorClasses = { active: true, error: true };
  //       console.log("Something went wrong:", err.message);
  //     });

  //     // this.authService
  //     //   .signup(this.signupForm.email, this.signupForm.password)
  //     //   .then(value => {
  //     //     value.user
  //     //       .sendEmailVerification()
  //     //       .then(async function () {
  //     //         await that.authService.logout();
  //     //         that.notifier.notify(
  //     //           "success",
  //     //           "Signup successful. Check your e-mail to verify your account."
  //     //         );
  //     //         $("#wrapper").toggleClass("toggled");
  //     //         $(".user-form").toggleClass("form-open");
  //     //       })
  //     //       .catch(function (err) {
  //     //         that.errorMessage = err.message;
  //     //         that.errorClasses = { active: true, error: true };
  //     //         console.log("Something went wrong:", err.message);
  //     //         that.authService.logout();
  //     //       });
  //     //     console.log("Success!");
  //     //   })
  //     //   .catch(err => {
  //     //     this.errorMessage = err.message;
  //     //     this.errorClasses = { active: true, error: true };
  //     //     console.log("Something went wrong:", err.message);
  //     //   });
  //   }
  // }

  // logout() {
  //   // this.cookieService.delete('eth-address');
  //   // this.authService.logout();
  //   this.appStateService.sendEvent(AppEvents.LoggedIn, false);
  //   this.appStateService.sendEvent(AppEvents.SetUser, null);

  //   this.authenticateService.logoff();
  //   this.user_authorized = false;
  //   if (this.user_authorized) {
  //     this.username = '';
  //   }
  // }

  searchVideos() {
    this.router.navigate(["search"], {
      queryParams: { query: this.searchQuery.trim() }
    });
  }

  // submit() {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (this.formData.name === null || this.formData.name === "") {
  //     this.errorMessage = "Name is required.";
  //     this.errorClasses = { active: true, error: true };
  //   } else if (this.formData.email === null || this.formData.email === "") {
  //     this.errorMessage = "Email is required.";
  //     this.errorClasses = { active: true, error: true };
  //   } else if (!re.test(this.formData.email)) {
  //     this.errorMessage = "Email is invalid.";
  //     this.errorClasses = { active: true, error: true };
  //   } else if (this.formData.message === null || this.formData.message === "") {
  //     this.errorMessage = "Message is required.";
  //     this.errorClasses = { active: true, error: true };
  //   } else {
  //     // this.contactus.add(this.formData);
  //     // TODO - Contact US API
  //     this.submitted = true;
  //   }
  // }

  // reset() {
  //   this.errorClasses = { active: false, error: false };
  //   this.errorMessage = "";
  //   // this.formData = { name: null, email: null, phone: null, message: null };
  //   this.form = { email: "", password: "", rememberMe: false };
  //   this.signupForm = {
  //     email: "",
  //     password: "",
  //     confirm_password: "",
  //     referral: ''
  //   };
  // }

  setAddress() {
    var eth_address = prompt("Enter your ERC20 Wallet Address?", "");
    if (eth_address == '' || eth_address == null) {
      this.isAddress = false;
    } else {
      this.cookieService.set('eth-address', eth_address);
      console.log("val:", eth_address);
      this.isAddress = true;
    }
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

  // comingSoon() {
  //   alert("This Section is Under Development and Coming Soon!");
  // }
  enableLogin() {
    this.isLogin = true;
  }
  closeLogin() {
    this.isLogin = false;
  }

  ngOnInit() {
    /* Login & signUp form */

    $(".login-toggle").on("click", function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $(".user-form").toggleClass("form-open");
    });
    $("#signUp-frm-button").on("click", function () {
      $(".login-form").removeClass("form-active");
      $(".signUp-form").addClass("form-active");
    });
    $("#login-frm-button").on("click", function () {
      $(".signUp-form").removeClass("form-active");
      $(".login-form").addClass("form-active");
    });

    /* Login & signUp form */

    /* Sharing Drop down */

    $(".sharing-drop").on("click", function () {
      $(".sharing-bar").toggleClass("sharing-bar-open");
      $(this).toggleClass("sharing-drop-open");
    });

    /* Sharing Drop down */

    /* Search */

    $(".btn-search-drop").on("click", function () {
      $("#search-form .search-group").toggleClass("search-group-active");
      $(this).toggleClass("btn-search-close");
    });

    this.cookieValue = this.cookieService.get('eth-address');
    //this.cookieService.delete('eth-address');
    if (this.cookieValue == null || this.cookieValue === '') {
      this.isAddress = false;
      //console.log("cookie value1::",this.cookieValue);
    }
    else {
      //console.log("cookie value2::",this.isAddress);
      this.isAddress = true;
    }
  }

}
