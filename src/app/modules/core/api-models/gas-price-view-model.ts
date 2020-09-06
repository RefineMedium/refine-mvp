import { BaseResponse } from './base-response-model';
import { GasPriceData } from './gas-price-data';

export interface GasPriceViewModel extends BaseResponse {
    data: GasPriceData;
}