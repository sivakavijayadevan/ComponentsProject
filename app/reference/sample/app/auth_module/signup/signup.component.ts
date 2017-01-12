// signup.component.js
import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate  } from '@angular/router-deprecated';
import { CORE_DIRECTIVES,
    FormBuilder,
    Validators,
    Control,
    ControlGroup,
    FORM_DIRECTIVES } from '@angular/common';
import { CommonValidators } from '../../shared/validators/common';
import { LoginService } from '../../shared/services/login.service';
import { Auth } from '../auth/auth';
import { checkAuth } from '../auth/check_auth';

@Component({
    selector: 'signup',
    providers: [LoginService, Auth],
    directives: [FORM_DIRECTIVES, RouterLink],
    templateUrl: 'src/app/auth_module/signup/signup.component.html',
    styles: [`
      body {
          background: #d2d6de;
      }
  `],
    encapsulation: ViewEncapsulation.None
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class SignupComponent implements AfterViewInit {

form: ControlGroup
appName: Control
    username: Control
email: Control
    password: Control
    passwordConfirm: Control
    
    ngAfterViewInit() {
    // jQuery('input').iCheck({
    //     checkboxClass: 'icheckbox_square-blue',
        //     radioClass: 'iradio_square-blue',
    //     increaseArea: '20%' // optional
    // });
} 

constructor(private _router: Router, private _loginService: LoginService, private _auth: Auth, private _formBuilder: FormBuilder) {
this.appName = new Control("", Validators.compose([Validators.required]));
        this.username = new Control("", Validators.compose([Validators.required]));
this.email = new Control("", Validators.compose([Validators.required, CommonValidators.email]));
    this.password = new Control("", Validators.compose([Validators.required]));
    this.passwordConfirm = new Control("", Validators.compose([Validators.required]));
    
    this.form = _formBuilder.group({
    appName: this.appName,
    username: this.username,
            email: this.email,
            password: this.password,
        passwordConfirm: this.passwordConfirm
    }, { validator: CommonValidators.matchingPasswords('password', 'passwordConfirm') });
    }
    
    submitForm() {
    
    // this._loginService.signupUser(this.form.value)
    //     .subscribe((response) => {
    //         // login user
    //         this._auth.login(response);
        //         // and then we redirect the user to the home
        //         this._router.navigate(['\Home']);
        //     });
    }

}
