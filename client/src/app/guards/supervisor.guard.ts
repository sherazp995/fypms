import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from 'app/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {
  constructor(private _router: Router, private appServices: AppService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let data = this.appServices.getUser()
      if (data && (data["role"] == "supervisor" || data["role"] == "admin")) {
          return true;
      } else {
        this._router.navigate(['/'])
        return false;
      }
    }

}
