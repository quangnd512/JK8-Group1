import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./components/service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService,private router: Router){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthencated().
        then(
            (isAuthen: boolean) => {
                if(isAuthen) {
                    return true;
                }
                else {
                    this.router.navigate(["/home"]);
                };
            }
        )
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isAuthencated().
        then(
            (isAuthen: boolean) => {
                if(isAuthen) {
                    return true;
                }
                else {
                    this.router.navigate(["/home"]);
                };
            }
        )
    }
    

}