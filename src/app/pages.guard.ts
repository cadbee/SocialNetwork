import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {ActivatedRoute, Router} from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PagesGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (environment.logged){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
