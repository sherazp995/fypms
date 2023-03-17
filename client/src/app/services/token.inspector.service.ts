import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInspectorService {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    token = JSON.parse(localStorage.getItem('data')) || {}
    token = token.token || null
    console.log('interceptor', token);
    
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
                        localStorage.removeItem('data')
                        this.router.navigate(['/login']);
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
