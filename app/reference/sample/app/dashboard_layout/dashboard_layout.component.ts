// dashboard.component.js
import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LoginService } from '../shared/services/login.service';
import { checkAuth } from '../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../auth_module/auth/auth';

@Component({
    selector: 'dashboard-layout',
    inputs: ['pageTitle', 'pageSubtitle'],
    providers: [LoginService],
    templateUrl: 'src/app/dashboard_layout/dashboard_layout.component.html',
    styleUrls: ['src/app/dashboard_layout/dashboard_layout.component.css'],
    directives: [ROUTER_DIRECTIVES, NgIf]
})

export class DashboardLayoutComponent {
    public loginData: LoginDataInterface
    public loggedIn: Boolean
    public pageTitle: String
    public pageSubtitle: String

    constructor(private _router: Router, private _auth: Auth) {
        this.loginData = this._auth.getLoginStatus();
        this.loggedIn = this._auth.loggedIn;
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['Login']); // r
    }

    changepassword() {      
        this._router.navigate(['ChangePassword']); // r
    }

}
