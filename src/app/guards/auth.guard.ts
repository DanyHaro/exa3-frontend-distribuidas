import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ExaService } from "../services/exa.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private exaservice:ExaService, private router:Router){

  }


  canActivate(): boolean{
    if (this.exaservice.isAuthenticated()) {
      return true;
    }else{
      this.router.navigateByUrl('login')
      return false;
    }
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
  }
  
}
