import { BaseResponse } from './base-response-model';
import { TransactionListViewModel } from './transaction-list-view-model';

export interface UserTransactionViewModel extends BaseResponse {
    data: TransactionListViewModel;
}