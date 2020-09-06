export interface TransactionData {
    txnId: number;
    toAddress: string;
    fromAddress: string;
    txnHash: string;
    amount: number;
    transactionType: string;
    transactionStatus: string;
    transactionTimestamp: Date;
}