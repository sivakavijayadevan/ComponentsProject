import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from "rxjs/Rx";
import {Config} from '../../config/config';
import {HttpServices} from './httpService.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    providers: [HttpServices]
})


@Injectable()
export class LoginService {

    constructor(private _http: Http, private _httpServices: HttpServices) {
    }

    loginUser(formValues: any) {
        let data = {
            user_id: formValues.username,
            password: formValues.password,
        };

        return this._httpServices.PostHttpWithoutToken(JSON.stringify(data), 'login')
            .catch(this.handleError);
    }
    /**
     * Service for change password
     */
    changePassword(formValues: any) {            
        let data = {
            old_password: formValues.oldpassword,
            new_password: formValues.password,
        };

        return this._httpServices.PostHttp(JSON.stringify(data), 'changepassword')
            .catch(this.handleError);
    }

    /**
     * Service for current user details
     */
    getUser(data:any){        
        return this._httpServices.PostHttp(data, 'currentuser')
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error|| null);
    }

}
