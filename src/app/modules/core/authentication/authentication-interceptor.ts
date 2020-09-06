import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ApiConfiguration } from 'src/app/api-configuration';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService, private config: ApiConfiguration) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf(this.config.rootUrl) > -1) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.token}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        return next.handle(req);
    }
}
