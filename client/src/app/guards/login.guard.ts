import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from 'app/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {
  constructor(
    private _router : Router, private appServices: AppService){ }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let data = this.appServices.get_user()
      if (data && data["_id"]) {
          this._router.navigate(['/'])
          return false;
      } else {
        return true;
      }
  }
  
}
