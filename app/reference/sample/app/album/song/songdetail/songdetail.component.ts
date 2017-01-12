// songdetail.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';

import { RadioButtonComponent } from '../../../shared/components/radiobutton.component/radiobutton.component';
import { RadioButtonPros } from '../../../shared/models/radiobutton';
import { LangJson } from '../../../shared/json/lang.json';
import { SongViewComponent } from '../../song/songview/songview.component';
import { AlbumViewComponent } from '../../../album/albumview/albumview.component';
import { Error} from '../../../shared/models/error';
import { ErrorComponent } from '../../../shared/components/error.component/error.component';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/song/songdetail/songdetail.component.html',
    styleUrls: ['src/app/album/song/songdetail/songdetail.component.css'],
    directives: [DashboardLayoutComponent, SongViewComponent, AlbumViewComponent, RadioButtonComponent, ErrorComponent, ROUTER_DIRECTIVES],
    providers: [LangJson]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class SongDetailComponent implements OnInit {
    private languageRadioOption: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    private language: string;
    private songFormLang: string;
    private albumId: string;
    private songId: string;
    private error: Error;


    constructor(private _router: Router, private _routeParams: RouteParams, private _langJson: LangJson) {
        let self = this;

        self.albumId = self._routeParams.get('albumid');
        self.songId = self._routeParams.get('songid');

        let data = _langJson.getJson();
        this.languageRadioOption = data;
        this.songFormLang = _langJson.homeLanguage;
    }

    ngOnInit() {
        let self = this;
    }

    langSelect(event: any) {
        let self = this;
        try {
            self.songFormLang = self.languageRadioOption[event.index].option.value;
        } catch (error) {
            this.appError(error);
        }
    }

    public backcall(event: any) {
        let self = this;
        self._router.navigate(['SongList', { albumid: self.albumId }]);
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
