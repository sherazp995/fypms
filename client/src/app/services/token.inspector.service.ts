import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInspectorService {

  constructor(private appServices: AppService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    token = localStorage.getItem('jwt')
    token = token || null
    
    if (token) {

        let tokenizedReq = request.clone({
            setHeaders: {
                accesstoken: token
            }
        })
        return next.handle(tokenizedReq)
        .pipe(
            tap(
                (err) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.appServices.logout();
                    }
                }
            ),
        )
        
    } else {

        let tokenizedReq = request.clone({
            setHeaders: {
                accesstoken: ''
            }
        })
        return next.handle(tokenizedReq);
    }
}
}
