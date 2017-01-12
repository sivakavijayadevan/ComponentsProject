// albumdetail.component.js
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { Auth } from '../../auth_module/auth/auth';
import { AlbumService } from '../../shared/services/album.service';
import { AlbumCollection } from '../../shared/models/album';
import { LangJson } from '../../shared/json/lang.json';
import { AlbumJson } from '../../shared/json/album.json';
import { CreditJson } from '../../shared/json/song.json/credit.json';
import { UrlValidators } from '../../shared/validators/url.validation';
import { SongValidators } from '../../shared/validators/song.validation';
import { LangDisplayComponent } from '../../shared/components/lang.display.component/lang.display.component';
import { LoadingIndicatorComponent } from '../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../shared/models/error';

@Component({
    selector: 'dpd-album-view',
    templateUrl: 'src/app/album/albumview/albumview.component.html',
    styleUrls: ['src/app/album/albumview/albumview.component.css'],
    directives: [LangDisplayComponent, LoadingIndicatorComponent],
    providers: [LangJson, AlbumJson, AlbumService, SongValidators, UrlValidators, CreditJson]
})

export class AlbumViewComponent implements OnInit {

    @Input('albumid') albumId: string;
    @Input('viewlang') albumViewLang: string;
    @Input('isfullview') isFullView: boolean = true;
    @Input('isheader') isHeader: boolean = true;
    @Output('error') onerror = new EventEmitter();

    private albumInfo: any;
    private album: any;
    private currentUser: any;
    private isLoading: boolean = false;
    private error: Error;
    private validationArr: string[] = [];
    private albumRootObject: AlbumCollection;

    constructor(private _router: Router, private _langJson: LangJson, _albumJson: AlbumJson, private _auth: Auth, private _albumService: AlbumService, private _songValidators: SongValidators) {
        try {
            this.albumInfo = _albumJson.getDetailedJson();
            this.albumRootObject = _albumJson.getJson();
            this.album = this.albumInfo.data.album;
            this.currentUser = _auth.getLoginStatus();
            toastr.options = { positionClass: 'toast-bottom-right', }
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {
            self.isLoading = true;
            self._albumService.getAlbumById(self.albumId).subscribe(
                data => self.SuccessOn(data),
                error => self.ErrorOn(error, self._router));
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOn(result: any, message: string = '') {
        let self = this;
        try {
            self.isLoading = false;
            if (message) toastr.success(message);
                
            self.albumInfo = result.data;
            self.album = result.data.data.album;
            self.albumRootObject = result.data.data;
        } catch (error) {
            this.appError(error);
        }
    }

    public ErrorOn(err: any, router: Router) {
        let self = this;
        try {
            self.isLoading = false;

            var customError = err;
            if (customError) {
                if (customError && customError.status == "1020") {
                    router.navigate(["Home"]);
                } else if (customError && customError.status == "1021") {
                    localStorage.setItem("id_token", "");
                    router.navigate(["Home"]);
                }
                let servererror = new Error();
                servererror.title = 'Server Error';
                servererror.messages = ['Error on getting the album!'];
                self.onerror.emit({ value: servererror });
            }
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
                    data => self.SuccessOn(data, 'Album preview success'),
                    error => self.ErrorOnPreview(error));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    publishAlbum() {
        let self = this;
        try {
            let validationData = { "album_id": self.albumId, "data": self.albumRootObject };
            let result = self.requestToPublishValidation(validationData);
            if (result.length == 0) {
                self.isLoading = true;
                if (this.albumInfo.published_status == 1) {
                    let data = { album_id: self.albumId, server: 'live' };
                    this._albumService.publishedAlbum(JSON.stringify(data)).subscribe(
                        data => self.SuccessOn(data, 'Album publish success'),
                        error => self.ErrorOnPreview(error));
                }
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
                self.onerror.emit({ value: previewerror });
                toastr.error('server error');
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public requestToPublishValidation(result: any) {
        let self = this;
        try {
            self.validationArr = [];
            self.validationArr = self._songValidators.AlbumValid(result);
            let apperror = new Error();
            apperror.title = "Preview Server Error";
            apperror.messages = self.validationArr;
            self.onerror.emit({ value: apperror });
            return self.validationArr;
        } catch (error) {
            this.appError(error);
        }
    }

    GoToSong() {
        this._router.navigate(["SongList", { albumid: this.albumId }]);
    }

    AddSong() {
        let albumId = localStorage.getItem("albumid");
        this._router.navigate(['AddSong', { albumid: this.albumId }]);
    }

    formatDate(data: string): string {
        try {
            if (!data) return "";
            let dateValue = new Date(data);
            let tMonth = dateValue.getMonth() + 1;
            let month = (tMonth < 10) ? "0" + tMonth : "" + tMonth;
            let date = (dateValue.getDate() < 10) ? "0" + dateValue.getDate() : "" + dateValue.getDate();
            return dateValue.getFullYear() + "/" + month + "/" + date;
        } catch (error) {
            this.appError(error);
        }
    }

    private appError(error: any) {
        let self = this;
        let apperror = new Error();
        apperror.title = 'Application Error';
        apperror.messages = [error.message];
        self.onerror.emit({ value: apperror });
    }
}