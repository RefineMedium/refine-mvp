import { BaseResponse } from './base-response-model';
import { UserDataViewModel } from './user-data';

export interface ProfileViewModel extends BaseResponse {
    data: UserDataViewModel;
}