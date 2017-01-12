import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
export interface LoginDataInterface {
    token?: string;
    userid: string;
    roleid: number;
    rolename: string;
    firstname: string;
    lastname: string;
    email: string;
}

@Injectable()
export class Auth {
    public loggedIn: Boolean
    public loginData: LoginDataInterface
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor() {
        this.loggedIn = false;
        this.emptyLoginData();
    }

    login(loginData: LoginDataInterface) {
        this.loggedIn = true;
        this.loginData = loginData;
        let userData = this.jwtHelper.decodeToken(loginData.token);
        this.loginData.userid = userData.user.userid;
        this.loginData.firstname = userData.user.firstname;
        this.loginData.lastname = userData.user.lastname;
        this.loginData.email = userData.user.email;
        this.loginData.roleid = userData.role.role_id;
        this.loginData.rolename = userData.role.role.role_name;
        localStorage.setItem('id_token', loginData.token);
        // set session
        localStorage.setItem('a2authLoginData', JSON.stringify(loginData));
    }

    getLoginStatus() {
        return JSON.parse(localStorage.getItem('a2authLoginData'));
    }

    loginFromSession() {
        // load from session
        if (localStorage.getItem("a2authLoginData") !== null && this.loggedIn === false) {
            var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
            this.login(a2authLoginData);
        }
    }

    logout() {
        this.loggedIn = false;
        this.emptyLoginData();
        localStorage.removeItem('a2authLoginData');
    }

    check() {
        if (localStorage.getItem("a2authLoginData") === null) {
            return false;
        }
        var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
        // session exits therefore, make at it login
        if (a2authLoginData.token) {
            this.loginFromSession();
            return true;
        }
    }

    emptyLoginData() {
        this.loginData = null;
    }
}
