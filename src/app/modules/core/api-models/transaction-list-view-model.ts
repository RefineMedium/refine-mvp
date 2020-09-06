import { TransactionData } from './transaction-data';

export interface TransactionListViewModel {
    resultSet: TransactionData[];
    count: number;
}