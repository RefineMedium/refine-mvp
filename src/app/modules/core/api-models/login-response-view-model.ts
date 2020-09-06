/*tslint:disable*/
import { LoginResponseData } from './login-response-data';
import { BaseResponse } from './base-response-model';

export interface LoginResponseViewModel extends BaseResponse {
    data: LoginResponseData;
}