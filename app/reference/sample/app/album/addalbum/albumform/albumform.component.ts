import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';

import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';

import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface} from '../../../auth_module/auth/auth';

import { RootObject, Datum } from '../../../shared/models/album.response';
import { LangInputObject } from '../../../shared/models/langelement';
import { AlbumCollection } from '../../../shared/models/album';

import { AlbumJson } from '../../../shared/json/album.json';
import { LanguageJson } from '../../../shared/json/language.json/language.json';

import { LangInputComponent } from '../../../shared/components/lang.input.component/lang.input.component';
import { LangTextAreaComponent } from '../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../shared/components/lang.select.component/lang.select.component';

import { AlbumService } from '../../../shared/services/album.service';
import { LoginService } from '../../../shared/services/login.service';
import { SongJson } from '../../../shared/json/song.json';
import { SongTypeJson } from '../../../shared/json/song.json/songtype.json';
import { SongModeJson } from '../../../shared/json/song.json/songmode.json';
import { LangJson } from '../../../shared/json/lang.json';
import { CreditJson } from '../../../shared/json/song.json/credit.json';
import { UrlValidators } from '../../../shared/validators/url.validation';
import { SongValidators } from '../../../shared/validators/song.validation';
import { LoadingIndicatorComponent } from '../../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../../shared/models/error';
import { ErrorComponent } from '../../../shared/components/error.component/error.component';

@Component({
    selector: 'album-form',
    templateUrl: 'src/app/album/addalbum/albumform/albumform.component.html',
    styleUrls: ['src/app/album/addalbum/albumform/albumform.component.css'],
    directives: [DashboardLayoutComponent, NgIf, LangInputComponent, LangTextAreaComponent, LangSelectComponent, ErrorComponent],
    providers: [AlbumService, AlbumJson, LanguageJson, SongValidators, UrlValidators, CreditJson, LangJson, SongModeJson, SongJson, SongTypeJson]
})

export class AlbumFormComponent implements OnInit {
    @Input('lang') languageId: string;
    @Input('albumid') albumId: string;
    @Output('selectChange') selectedValue = new EventEmitter();

    public loginData: LoginDataInterface;
    public loggedIn: Boolean;
    public isLoading: boolean = false;

    private albumInfo: any;
    private responseresult: string[];
    private albumRootObject: AlbumCollection;
    private validationArr: string[] = [];
    private languageSelectOption: any;
    private message: String[];
    private albumTypeSelectOption: any;
    messages: string;
    private error: Error;

    constructor(private _router: Router, private _auth: Auth, private _albumService: AlbumService, private _albumJson: AlbumJson, private _languageJson: LanguageJson, private _songValidators: SongValidators, private _songTypeJson: SongTypeJson) {
        let self = this;
        try {
            this.loginData = this._auth.getLoginStatus();
            this.loggedIn = this._auth.loggedIn;

            this.albumInfo = _albumJson.getDetailedJson();
            self.albumRootObject = _albumJson.getJson();
            self.languageSelectOption = _languageJson.getLanguageJson();
            self.albumTypeSelectOption = _songTypeJson.getSongType();
            toastr.options = { positionClass: 'toast-bottom-right', }
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {

            if (self.albumId) {
                self.isLoading = true;
                let searchObj = { album_id: self.albumId }
                self._albumService.getAlbumsearch(JSON.stringify(searchObj))
                    .subscribe(data => self.SuccessOnGetAlbum(data),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    langSelect(event: any) {
        let self = this;
    }

    saveBtn(event: any) {
        let self = this;
        try {
            let saveAlbumData = { "data": self.albumRootObject };
            let result = self.saveEditValidation(saveAlbumData);

            if (result.length == 0) {
                self.isLoading = true;
                self._albumService.addAlbum(JSON.stringify(saveAlbumData))
                    .subscribe(data => self.SuccessOnAddOrEditAlbum(data, self._router),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    editBtn(event: any) {
        let self = this;
        try {
            var data = {
                "album_id": self.albumId,
                changed: self.albumRootObject
            }
            self._albumService.checkDifferentObject(JSON.stringify(data))
                .subscribe(data => self.callEditOnSuccess(data),
                error => self.callEditError());

        } catch (error) {
            this.appError(error);
        }
    }

    callEditOnSuccess(status: boolean) {
        let self = this;
        try {
            let saveAlbumData = {
                "album_id": self.albumId,
                "data": self.albumRootObject
            };

            let result = self.saveEditValidation(saveAlbumData);
            if (result.length == 0) {
                self.isLoading = true;
                self._albumService.editAlbum(JSON.stringify(saveAlbumData))
                    .subscribe(data => self.SuccessOnGetAlbum(data, 'Album updated successfully'),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    callEditError() {
        toastr.info('No Changes in album');
    }

    public requestToPublishValidation(result: any) {
        let self = this;
        try {
            self.validationArr = [];
            self.validationArr = self._songValidators.AlbumValid(result);
            let apperror = new Error();
            apperror.title = "Validation Error!";
            apperror.messages = self.validationArr;
            self.error = apperror;
            return self.validationArr;
        } catch (error) {
            this.appError(error);
        }
    }

    previewAlbum() {
        let self = this;
        try {
            let validationData = { "album_id": self.albumId, "data": self.albumRootObject };
            let result = self.requestToPublishValidation(validationData);
            if (result.length == 0) {
                self.isLoading = true;
                let data = { album_id: self.albumId };
                this._albumService.publishedAlbum(JSON.stringify(data)).subscribe(
                    data => self.SuccessOnGetAlbum(data, 'Album preview success'),
                    error => self.ErrorOnPreview(error));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public ErrorOnPreview(result: any) {
        let self = this;
        try {
            self.isLoading = false;
          console.log(result.error);
            if (result.error && result.error.message) {  
                console.log();              
                var error = JSON.parse(result.error.message);

                self.validationArr = [];
                error.forEach(function (params: any) {
                    self.validationArr.push(params.message);
                });
                let previewerror = new Error();
                previewerror.title = 'Preview Server Error';
                previewerror.messages = self.validationArr;
                self.error = previewerror;
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public saveEditValidation(result: any) {
        let self = this;
        try {
            self.validationArr = [];
            self.validationArr = self._songValidators.AlbumRequiredValid(result);
            let apperror = new Error();
            apperror.title = "Validation Error!";
            apperror.messages = self.validationArr;
            self.error = apperror;
            return self.validationArr;
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnGetAlbum(result: any, message: string = '') {
        let self = this;
        try {
            self.isLoading = false;
            if (message) toastr.success(message);            
            self.albumInfo = result.data;
            self.albumRootObject = result.data.data;
            if (result.error && result.error.message) {            
                var error = JSON.parse(result.error.message);

                self.validationArr = [];
                error.forEach(function (params: any) {
                    self.validationArr.push("preview Server Error! " + params.message);
                });
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnAddOrEditAlbum(result: any, router: Router) {
        let self = this;
        self.isLoading = false;
        router.navigate(["AlbumList"]);
    }

    public ErrorOn(err: any, router: Router) {
        let self = this;
        try {
            self.isLoading = false;
            var customError = err;
            if (customError.error) {
                var length = customError.error.length;

                if (length != 0) {
                    self.responseresult = [];
                    for (var i = 0; i < length; i++) {
                        if (customError.error[i].error) {
                            self.responseresult.push(customError.error[i].error.message);
                        }
                    }
                    let valerror = new Error();
                    valerror.title = 'Validation Error';
                    valerror.messages = self.responseresult;
                    self.error = valerror;
                }
            }

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
                self.error = servererror;
            }
        } catch (error) {
            this.appError(error);
        }
    }

    requestPublishAlbum() {
        let self = this;
        try {
            let saveSongData = { "album_id": self.albumId, "data": self.albumRootObject };
            let result = self.requestToPublishValidation(saveSongData);
            if (result.length == 0) {
                self.isLoading = true;
                if (self.albumInfo.published_status == 0) {
                    self._albumService.requsetPublishedAlbum(JSON.stringify(saveSongData)).subscribe(
                        data => self.SuccessOnGetAlbum(data, 'Album request to publish success'),
                        error => self.ErrorOnPreview(error));
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    copyFrom(langKeyFrom: string, langKeyTo: string) {
        let self = this;
        try {
            for (var key in self.albumRootObject['album']) {
                if (typeof self.albumRootObject['album'][key] === "object" && !self.albumRootObject['album'][key].length && langKeyFrom in self.albumRootObject['album'][key]) {                   
                    self.albumRootObject['album'][key]['hi'] = self.albumRootObject['album'][key][langKeyFrom];
                    self.albumRootObject['album'][key]['te'] = self.albumRootObject['album'][key][langKeyFrom];
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    selectionChange(event: any, index: number) {
        let self = this;
        try {
            if (event.value) {
                if (event.key == 'language') {
                    self.albumRootObject['album'][event.key] = event.value;
                } else if (event.key == 'type') {
                    self.albumRootObject['album'][event.key] = event.value;
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    activeClick(status: boolean) {
        let self = this;
        try {
            self.albumRootObject['album'].active = status;
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
