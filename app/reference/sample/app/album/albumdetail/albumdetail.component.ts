// albumdetail.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../auth_module/auth/check_auth';
import { RadioButtonComponent } from '../../shared/components/radiobutton.component/radiobutton.component';
import { RadioButtonPros } from '../../shared/models/radiobutton';
import { LangJson } from '../../shared/json/lang.json';
import { AlbumViewComponent } from '../../album/albumview/albumview.component';
import { Error} from '../../shared/models/error';
import { ErrorComponent } from '../../shared/components/error.component/error.component';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/albumdetail/albumdetail.component.html',
    styleUrls: ['src/app/album/albumdetail/albumdetail.component.css'],
    directives: [DashboardLayoutComponent, RadioButtonComponent, AlbumViewComponent, ErrorComponent],
    providers: [LangJson]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class AlbumDetailComponent implements OnInit {
    private albumId: string;
    private languageRadioOption: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    private albumFormLang: string;
    private error: Error;

    constructor(private _router: Router, private _langJson: LangJson) {
        try {
            let langData = _langJson.getJson();
            this.languageRadioOption = langData;
            this.albumFormLang = _langJson.homeLanguage;
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {
            this.albumId = localStorage.getItem("albumid");
        } catch (error) {
            this.appError(error);
        }
    }

    langSelect(event: any) {
        let self = this;
        try {
            this.albumFormLang = self.languageRadioOption[event.index].option.value;
        } catch (error) {
            this.appError(error);
        }
    }

    getErrorMessage(event: any) {
        let self = this;
        try {
            self.error = event.value;
        } catch (error) {
            this.appError(error);
        }
    }

    private appError(error: any) {
        let self = this;
        let apperror = new Error();
        apperror.title = 'Application Error';
        apperror.messages = [error.message];
        self.error = apperror;
    }
}