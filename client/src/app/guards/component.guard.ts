import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from 'app/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentGuard implements CanActivateChild {
  constructor(private _router: Router, private appServices: AppService){}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.appServices.userLoggedIn()) {
          return true;
      } else {
        this._router.navigate(['/login'])
        return false;
      }
  }

}
