import { BaseResponse } from './base-response-model';
import { UserDataViewModel } from './user-data';

export interface UsersListViewModel extends BaseResponse {
    data: UserDataViewModel[];
}