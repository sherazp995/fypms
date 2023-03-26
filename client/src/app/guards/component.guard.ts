import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentGuard implements CanActivateChild {
  constructor(private _router: Router){}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let data = JSON.parse(localStorage.getItem('data'))
      if (data && data._id) {
        console.log("Has Access")
          return true;
      } else {
        this._router.navigate(['/login'])
        return false;
      }
  }
  
}
