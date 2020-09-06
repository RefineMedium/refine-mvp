import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';
import { ApiConfiguration } from 'src/app/api-configuration';
import { SignUpViewModel } from '../api-models/sign-up-view-model';
import { SignUpResponseViewModel } from '../api-models/sign-up-response-view-model';
import { LoginViewModel } from '../api-models/login-view-model';
import { LoginResponseViewModel } from '../api-models/login-response-view-model';
import { BaseResponse } from '../api-models/base-response-model';
import { UsersListViewModel } from '../api-models/users-list-view-model';
import { ProfileViewModel } from '../api-models/profile-view-model';
import { AdminTransferViewModel } from '../api-models/admin-transfer-view-model';
import { UserTransferViewModel } from '../api-models/user-transfer-view-model';
import { UpdateBalanceViewModel } from '../api-models/update-balance-view-model';
import { UserTransactionViewModel } from '../api-models/user-transaction-view-model';
import { GasPriceViewModel } from '../api-models/gas-price-view-model';
import { GasPriceUpdate } from '../api-models/gas-price-update';
import { ContactUsViewModel } from '../api-models/contact-us-view-model';
import { environment } from 'src/environments/environment';
import { ResetPasswordViewModel } from '../api-models/reset-password-view-model';

@Injectable({
  providedIn: 'root'
})

export class AccountService extends BaseService {
  static readonly SignupPostPath = '/signup';
  static readonly LoginPath = '/login';
  static readonly CreateWalletPath = '/wallet/create-wallet';
  static readonly InviteUserPath = '/invite-user?email=';
  static readonly AllUsersPath = '/get-all-users';
  static readonly MyAccountPath = '/my-account';
  static readonly UserAccountPath = '/user-details?userId=';
  static readonly UserTransferPath = '/transfer/withdrawal';
  static readonly AdminTransferPath = '/transfer/admin-user-transfer';
  static readonly UpdateLiveBalancePath = '/admin/storage/get-wallet';
  static readonly UpdateBalancePath = '/wallet/update-live-balance';
  static readonly UserTransactionsPath = '/transfer/transaction-history-by-user?address=';
  static readonly CurrentGasPricePath = '/admin/storage/get-gas-params';
  static readonly GasPriceUpdatePath = '/admin/storage/update-gas-params';
  static readonly ContactUsPath = '/contact-us';
  static readonly ForgotPasswordPath = '/forget-password?email=';
  static readonly ResetPasswordPath = '/forget-password?email=';
  static readonly VerifyPath = '/verify-user?token=';

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param signUpViewModel undefined
   * @return Success
   */
  ApiSignUpPostResponse(signUpViewModel: SignUpViewModel): __Observable<StrictHttpResponse<SignUpResponseViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = signUpViewModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.SignupPostPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<SignUpResponseViewModel>;
      })
    );
  }
  /**
   * @param signUpViewModel undefined
   * @return Success
   */
  ApiSignUpPost(signUpViewModel: SignUpViewModel): __Observable<SignUpResponseViewModel> {
    return this.ApiSignUpPostResponse(signUpViewModel).pipe(
      __map(_r => _r.body as SignUpResponseViewModel)
    );
  }

  /**
   * @param loginModel undefined
   * @return Success
   */
  ApiLoginPostResponse(loginModel: LoginViewModel): __Observable<StrictHttpResponse<LoginResponseViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = loginModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.LoginPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<LoginResponseViewModel>;
      })
    );
  }
  /**
   * @param loginModel undefined
   * @return Success
   */
  ApiLoginPost(loginModel: LoginViewModel): __Observable<LoginResponseViewModel> {
    return this.ApiLoginPostResponse(loginModel).pipe(
      __map(_r => _r.body as LoginResponseViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiCreateWalletPostResponse(): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.authService.token}`,
    });
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.CreateWalletPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiCreateWalletPost(): __Observable<BaseResponse> {
    return this.ApiCreateWalletPostResponse().pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param email undefined
   * @return Success
   */
  ApiInviteUserGetResponse(email: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.InviteUserPath + `${email}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param email undefined
   * @return Success
   */
  ApiInviteUserGet(email: string): __Observable<BaseResponse> {
    return this.ApiInviteUserGetResponse(email).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @return Success
   */
  ApiGetAllUsersGetResponse(): __Observable<StrictHttpResponse<UsersListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.AllUsersPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<UsersListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGetAllUsersGet(): __Observable<UsersListViewModel> {
    return this.ApiGetAllUsersGetResponse().pipe(
      __map(_r => _r.body as UsersListViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiMyAccountGetResponse(): __Observable<StrictHttpResponse<ProfileViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.MyAccountPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ProfileViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiMyAccountGet(): __Observable<ProfileViewModel> {
    return this.ApiMyAccountGetResponse().pipe(
      __map(_r => _r.body as ProfileViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiUserAccountGetResponse(userId: string): __Observable<StrictHttpResponse<ProfileViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.UserAccountPath + `${userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ProfileViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiUserAccountGet(userId: string): __Observable<ProfileViewModel> {
    return this.ApiUserAccountGetResponse(userId).pipe(
      __map(_r => _r.body as ProfileViewModel)
    );
  }

  /**
   * @param userTransferViewModel undefined
   * @return Success
   */
  ApiUserTransferPostResponse(userTransferViewModel: UserTransferViewModel): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = userTransferViewModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.UserTransferPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param userTransferViewModel undefined
   * @return Success
   */
  ApiUserTransferPost(userTransferViewModel: UserTransferViewModel): __Observable<BaseResponse> {
    return this.ApiUserTransferPostResponse(userTransferViewModel).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param adminTransferViewModel undefined
   * @return Success
   */
  ApiAdminTransferPostResponse(adminTransferViewModel: AdminTransferViewModel): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = adminTransferViewModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.AdminTransferPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param adminTransferViewModel undefined
   * @return Success
   */
  ApiAdminTransferPost(adminTransferViewModel: AdminTransferViewModel): __Observable<BaseResponse> {
    return this.ApiAdminTransferPostResponse(adminTransferViewModel).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @return Success
   */
  ApiLiveBalanceGetResponse(): __Observable<StrictHttpResponse<UpdateBalanceViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.UpdateLiveBalancePath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<UpdateBalanceViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiLiveBalanceGet(): __Observable<UpdateBalanceViewModel> {
    return this.ApiLiveBalanceGetResponse().pipe(
      __map(_r => _r.body as UpdateBalanceViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiUserTransactionsGetResponse(walletAddress: string, pageNo: number, pageSize: number): __Observable<StrictHttpResponse<UserTransactionViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.UserTransactionsPath + `${walletAddress}&pageNo=${pageNo}&pageSize=${pageSize}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<UserTransactionViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiUserTransactionsGet(walletAddress: string, pageNo: number, pageSize: number): __Observable<UserTransactionViewModel> {
    return this.ApiUserTransactionsGetResponse(walletAddress, pageNo, pageSize).pipe(
      __map(_r => _r.body as UserTransactionViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiGasPriceGetResponse(): __Observable<StrictHttpResponse<GasPriceViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.CurrentGasPricePath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<GasPriceViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGasPriceGet(): __Observable<GasPriceViewModel> {
    return this.ApiGasPriceGetResponse().pipe(
      __map(_r => _r.body as GasPriceViewModel)
    );
  }

  /**
 * @param gasPriceUpdate undefined
 * @return Success
 */
  ApiUpdateGasPricePostResponse(gasPriceUpdate: GasPriceUpdate): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = gasPriceUpdate;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.GasPriceUpdatePath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param gasPriceUpdate undefined
   * @return Success
   */
  ApiUpdateGasPricePost(gasPriceUpdate: GasPriceUpdate): __Observable<BaseResponse> {
    return this.ApiUpdateGasPricePostResponse(gasPriceUpdate).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @return Success
   */
  ApiUpdateBalanceGetResponse(): __Observable<StrictHttpResponse<UpdateBalanceViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.UpdateBalancePath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<UpdateBalanceViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiUpdateBalanceGet(): __Observable<UpdateBalanceViewModel> {
    return this.ApiUpdateBalanceGetResponse().pipe(
      __map(_r => _r.body as UpdateBalanceViewModel)
    );
  }

  /**
   * @param contactUsViewModel undefined
   * @return Success
   */
  ApiContactUsPostResponse(contactUsViewModel: ContactUsViewModel): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = contactUsViewModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.ContactUsPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param contactUsViewModel undefined
   * @return Success
   */
  ApiContactUsPost(contactUsViewModel: ContactUsViewModel): __Observable<BaseResponse> {
    return this.ApiContactUsPostResponse(contactUsViewModel).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param email undefined
   * @return Success
   */
  ApiForgotPasswordGetResponse(email: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.ForgotPasswordPath + `${email}&webUrl=${environment.forgotRedirectUrl}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }

  /**
   * @param contactUsViewModel undefined
   * @return Success
   */
  ApiForgotPasswordGet(email: string): __Observable<BaseResponse> {
    return this.ApiForgotPasswordGetResponse(email).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param resetPasswordViewModel undefined
   * @return Success
   */
  ApiResetPasswordPostResponse(resetPasswordViewModel: ResetPasswordViewModel): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = resetPasswordViewModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + AccountService.ResetPasswordPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param resetPasswordViewModel undefined
   * @return Success
   */
  ApiResetPasswordPost(resetPasswordViewModel: ResetPasswordViewModel): __Observable<BaseResponse> {
    return this.ApiResetPasswordPostResponse(resetPasswordViewModel).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param token undefined
   * @return Success
   */
  ApiVerifyGetResponse(token: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + AccountService.VerifyPath + `${token}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }

  /**
   * @param token undefined
   * @return Success
   */
  ApiVerifyGet(token: string): __Observable<BaseResponse> {
    return this.ApiVerifyGetResponse(token).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }
}