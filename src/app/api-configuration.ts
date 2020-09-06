/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Global configuration for Api services
 */
@Injectable({
    providedIn: 'root',
})
export class ApiConfiguration {
    rootUrl: string = environment.refineEndPoint;
}

export interface ApiConfigurationInterface {
    rootUrl?: string;
}
