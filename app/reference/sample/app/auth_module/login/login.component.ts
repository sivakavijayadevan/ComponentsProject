// login.component.js
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate  } from '@angular/router-deprecated';
import { CORE_DIRECTIVES,
FormBuilder,
Validators,
Control,
ControlGroup,
NgClass,
FORM_DIRECTIVES } from '@angular/common';
import { LoginService } from '../../shared/services/login.service';
import { Auth } from '../auth/auth';
import { checkAuth } from '../auth/check_auth';

@Component({
    selector: 'login',
    providers: [LoginService, Auth],
    directives: [RouterLink, NgClass],
    templateUrl: 'src/app/auth_module/login/login.component.html',
    styleUrls: ['src/app/auth_module/login/login.component.css'],
    encapsulation: ViewEncapsulation.None
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class LoginComponent {
    form: ControlGroup
    username: Control
    password: Control
    message: string;
    color = false;

    constructor(private _router: Router, private _loginService: LoginService, private _auth: Auth, private _formBuilder: FormBuilder) {
        this.username = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required]));

        this.form = _formBuilder.group({
            username: this.username,
            password: this.password,
        });
    }

    login(event: Event) {
        let self = this;
        event.preventDefault();

        this._loginService.loginUser(this.form.value)
            .subscribe(
            data => self.SuccessOn(data, self._auth, self._router),
            error => self.ErrorOn(error, self._router));

    }

    public SuccessOn(result: any, _auth: Auth, _router: Router) {
        _auth.login(result);
        _router.navigate(['AlbumList']);
    }

    public ErrorOn(err: any, router: Router) {
        let self = this;
        var customError = err;
        if (customError && customError.error) {
            customError.error.error.forEach(function(element: any) {
                self.message = element.message;
                self.color = true;                
            })
        }
    }
}
