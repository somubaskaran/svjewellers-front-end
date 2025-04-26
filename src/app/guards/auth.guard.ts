import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { stat } from 'fs';
import { Observable } from 'rxjs';
//import { AuthService } from 'app/shared/services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    //private _authService: AuthService,
  ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(this._authService.accessToken);
      // if(this._authService.accessToken){
      //   return true;
      // }else{
      //   this.router.navigate(['/auth/login']);
      //   return false;
      // }
      var status = localStorage.getItem('loginStatus');
      console.log(status);
      if(status=='loggedin'){
        return true;
      } else {
           this.router.navigate(['/login']);
           return false
      }
  }
  
}
