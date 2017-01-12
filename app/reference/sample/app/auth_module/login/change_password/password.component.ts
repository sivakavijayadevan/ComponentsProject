// signup.component.js
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, RouteParams } from '@angular/router-deprecated';
import { CORE_DIRECTIVES,
    FormBuilder,
    FORM_DIRECTIVES,
    Validators,
    Control,
    ControlGroup,
    NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { CommonValidators } from '../../../shared/validators/common';
import { LoginService} from '../../../shared/services/login.service';
import { Auth } from '../../auth/auth';
import { checkAuth } from '../../auth/check_auth';
import { Error} from '../../../shared/models/error';
import { ErrorComponent } from '../../../shared/components/error.component/error.component';

@Component({
    selector: 'profile',
    providers: [LoginService, Auth],
    directives: [DashboardLayoutComponent, FORM_DIRECTIVES, RouterLink],
    templateUrl: 'src/app/auth_module/login/change_password/password.component.html',
    styleUrls: ['src/app/auth_module/login/change_password/password.component.css'],
    encapsulation: ViewEncapsulation.None
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class ProfileComponent {

    form: ControlGroup
    appName: Control
    oldpassword: Control
    password: Control
    passwordConfirm: Control
    message: string;
    msg: string;
    message1: string;
    currentUser: string;
    userRole: string;
    active = true;
    color = false;

    @Output('error') onerror = new EventEmitter();

    private isLoading: boolean = false;
    private error: Error;
    private data: any = {};



    constructor(private _router: Router, private _loginService: LoginService, private _auth: Auth, private _formBuilder: FormBuilder) {
        this.oldpassword = new Control("", Validators.compose([Validators.required]));
        this.passwordConfirm = new Control("", Validators.compose([Validators.required]));

        this.form = _formBuilder.group({
            oldpassword: this.oldpassword,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
        }, { validator: CommonValidators.matchingPasswords('password', 'passwordConfirm') });
    }

    ngOnInit() {
        let self = this;
        try {
            self.isLoading = true;
            this._loginService.getUser(null)
                .subscribe(
                data => self.SuccessOn(data, self._auth, self._router),
                error => self.ErrorOn(error, self._router));
        } catch (error) {
            this.appError(error);
        }
    }

    changepassword(data: any) {

        this.data = data;
        let self = this;
        event.preventDefault();

        this._loginService.changePassword(this.data)
            .subscribe(
            data => self.SuccessOns(data, self._auth, self._router),
            error => self.ErrorOn(error, self._router));
    }

    /**
     * Reset Form values
     */
    reset(data: any) {
        this.active = false;
        this.data = {};
    }
       
    resetMessage() {
        this.active = true;
        this.message = "";
        this.message1 = "";
    }

    public SuccessOn(result: any, _auth: Auth, _router: Router) {
        let self = this;
        try {
            self.isLoading = false;            
            self.currentUser = result.user[0].user_name;
            self.userRole = result.role.role.role_name;         

        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOns(result: any, _auth: Auth, _router: Router) {
        let self = this;
        self.active = false;
        self.message1 = "changed Successfully";
        self.message = null;
        this.reset(result);

    }

    public ErrorOn(err: any, router: Router) {
        let self = this;
        var customError = err;
        if (customError && customError.error) {
            self.message = customError.error;
            customError.error.forEach(function (element: any) {
                self.message1 = null;
                self.message = element.error.message;
            })
        }
    }

    private appError(error: any) {
        let self = this;
        let apperror = {
            "title": 'Application Error',
            "messages": [error.message]
        };

        self.onerror.emit({ value: apperror });
    }
}