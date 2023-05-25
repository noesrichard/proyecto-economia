import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AsesorGuard implements CanActivate {
  constructor(private security: SecurityService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rol = this.security.decrypt(localStorage.getItem('rol'))
    if(rol == 'asesor'){
      return true;
    }
    this.router.navigate(['home'])
    return false
  }

}
