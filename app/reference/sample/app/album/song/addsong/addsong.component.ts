// songlist.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
import { RootObject, Datum } from '../../../shared/models/song.response';
import { AlbumCollection } from '../../../shared/models/album';

import { RadioButtonComponent } from '../../../shared/components/radiobutton.component/radiobutton.component';
import { RadioButtonPros } from '../../../shared/models/radiobutton';
import { AlbumJson } from '../../../shared/json/album.json';
import { AlbumViewComponent } from '../../../album/albumview/albumview.component';

import { SongFormComponent } from '././songform/songform.component';
import { SongService } from '../../../shared/services/song.service';
import { AlbumService } from '../../../shared/services/album.service';
import { LangJson } from '../../../shared/json/lang.json';
import { LoginService } from '../../../shared/services/login.service';
import { SongJson } from '../../../shared/json/song.json';
import { Error} from '../../../shared/models/error';
import { ErrorComponent } from '../../../shared/components/error.component/error.component';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/song/addsong/addsong.component.html',
    styleUrls: ['src/app/album/song/addsong/addsong.component.css'],
    directives: [DashboardLayoutComponent, NgIf, RadioButtonComponent, SongFormComponent, AlbumViewComponent, ErrorComponent, ROUTER_DIRECTIVES],
    providers: [SongService, AlbumService, AlbumJson, LangJson, LoginService, SongJson]
})

// @CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
//     let _router: Router;
//     return checkAuth(next, previous, _router);
// })

export class AddSongComponent implements OnInit {
    private languageRadioOption: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    private language: string;
    private albumFormLang: string;
    private albumId: string;
    private songId: string;
    private albumRootObject: AlbumCollection;
    public loginData: LoginDataInterface;
    public loggedIn: Boolean;
    public error: Error;

    constructor(private _router: Router, private _auth: Auth, private _routeParams: RouteParams,
        private _songJson: SongJson,
        private _songService: SongService, private _albumService: AlbumService, private _albumJson: AlbumJson, private _langJson: LangJson) {
        let self = this;
        try {
            this.loginData = this._auth.getLoginStatus();
            this.loggedIn = this._auth.loggedIn;

            self.albumId = self._routeParams.get('albumid');
            self.songId = self._routeParams.get('songid') ? self._routeParams.get('songid') : "";
            self.albumRootObject = _albumJson.getJson();
            this.languageRadioOption = _langJson.getJson();
            this.albumFormLang = "en";
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {

            if (self.albumId) {
                let searchObj = {
                    album_id: self.albumId
                }

                self._albumService.getAlbumsearch(JSON.stringify(searchObj))
                    .subscribe(data => self.SuccessOnGetAlbum(data),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnGetAlbum(result: any) {
        let self = this;
        try {
            self.albumRootObject = result.data.data;
        } catch (error) {
            this.appError(error);
        }
    }

    public ErrorOn(err: any, router: Router) {
        try {
            var customError = err;
            if (customError) {
                if (customError.error[0].errorCode == "1020") {
                    this._auth.logout();
                    router.navigate(['Login']);
                } else if (customError && customError.status == "1021") {
                    localStorage.setItem("id_token", "");
                    router.navigate(["Home"]);
                }
                let servererror = new Error();
                servererror.title = 'Server Error';
                servererror.messages = ['Error on loading this page!'];
                this.error = servererror;
            }
        } catch (error) {
            this.appError(error);
        }
    }

    langSelect(event: any) {
        let self = this;
        try {
            self.albumFormLang = self.languageRadioOption[event.index].option.value;
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
