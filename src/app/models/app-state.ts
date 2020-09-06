import { BehaviorSubject } from 'rxjs';
import { LoginResponseData } from '../modules/core/api-models/login-response-data';

/*
Class: AppState
Purpose: Holds application state
Notes: Keep this class small, components that need access will subscribe to observables from AppState Service
*/
export class AppState {
    public isLoggedIn$: BehaviorSubject<boolean>;
    public currentUser$: BehaviorSubject<LoginResponseData>;

    constructor() {
        this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
        const defaultTokenResponse: LoginResponseData = {
            token: '',
            email: '',
            role: '',
            address: '',
            balance: 0,
            isAdmin: false,
            name: '',
        };
        this.currentUser$ = new BehaviorSubject<LoginResponseData>(defaultTokenResponse);
    }
}
