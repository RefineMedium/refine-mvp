import { Injectable } from '@angular/core';
import { AppBaseService } from '../base-service/base.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { BroadcasterService } from '../broadcaster/broadcaster.service';
import { AccountService } from '../../services/account.service';
import { SignUpViewModel } from '../../api-models/sign-up-view-model';
import { LoginViewModel } from '../../api-models/login-view-model';
import { AdminTransferViewModel } from '../../api-models/admin-transfer-view-model';
import { UserTransferViewModel } from '../../api-models/user-transfer-view-model';
import { GasPriceUpdate } from '../../api-models/gas-price-update';
import { ContactUsViewModel } from '../../api-models/contact-us-view-model';
import { ResetPasswordViewModel } from '../../api-models/reset-password-view-model';

@Injectable({
  providedIn: 'root'
})

export class AppAccountService extends AppBaseService {
  constructor(broadcaster: BroadcasterService, private accountService: AccountService) {
    super(broadcaster);
  }

  public signUp(signUpViewModel: SignUpViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiSignUpPost(signUpViewModel).pipe(
      catchError(err => {
        return throwError(this.handleError('Sign Up', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public login(login: LoginViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiLoginPost(login).pipe(
      catchError(err => {
        this.processing(false);
        return throwError(err);
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public createWallet(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiCreateWalletPost().pipe(
      catchError(err => {
        return throwError(this.handleError('Create Wallet', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public inviteUser(email: string): Observable<any> {
    this.processing(true);
    return this.accountService.ApiInviteUserGet(email).pipe(
      catchError(err => {
        return throwError(this.handleError('Invite User', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getAllUsers(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiGetAllUsersGet().pipe(
      catchError(err => {
        return throwError(this.handleError('All Users', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public myProfile(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiMyAccountGet().pipe(
      catchError(err => {
        return throwError(this.handleError('My Profile', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public userProfile(userId: string): Observable<any> {
    this.processing(true);
    return this.accountService.ApiUserAccountGet(userId).pipe(
      catchError(err => {
        return throwError(this.handleError('User Profile', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public userTransfer(userTransferViewModel: UserTransferViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiUserTransferPost(userTransferViewModel).pipe(
      catchError(err => {
        return throwError(this.handleError('User Transfer', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public adminTransfer(adminTransferViewModel: AdminTransferViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiAdminTransferPost(adminTransferViewModel).pipe(
      catchError(err => {
        return throwError(this.handleError('Admin Transfer', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public updateBalance(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiLiveBalanceGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Update Balance', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public updateUserBalance(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiUpdateBalanceGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Update Balance', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getUserTransactions(walletAddress: string, pageNo: number, pageSize: number): Observable<any> {
    this.processing(true);
    return this.accountService.ApiUserTransactionsGet(walletAddress, pageNo, pageSize).pipe(
      catchError(err => {
        return throwError(this.handleError('Get User Transactions', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getGasPrice(): Observable<any> {
    this.processing(true);
    return this.accountService.ApiGasPriceGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Get Gas Price', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public updateGasPrice(gasPriceUpdate: GasPriceUpdate): Observable<any> {
    this.processing(true);
    return this.accountService.ApiUpdateGasPricePost(gasPriceUpdate).pipe(
      catchError(err => {
        return throwError(this.handleError('Update Gas Price', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public contactUs(contactUsViewModel: ContactUsViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiContactUsPost(contactUsViewModel).pipe(
      catchError(err => {
        return throwError(this.handleError('Contact Us', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public forgotPassword(email: string): Observable<any> {
    this.processing(true);
    return this.accountService.ApiForgotPasswordGet(email).pipe(
      catchError(err => {
        return throwError(this.handleError('Contact Us', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public resetPassword(resetPasswordViewModel: ResetPasswordViewModel): Observable<any> {
    this.processing(true);
    return this.accountService.ApiResetPasswordPost(resetPasswordViewModel).pipe(
      catchError(err => {
        return throwError(this.handleError('Contact Us', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public verifyUser(token: string): Observable<any> {
    this.processing(true);
    return this.accountService.ApiVerifyGet(token).pipe(
      catchError(err => {
        return throwError(this.handleError('Contact Us', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }
}
