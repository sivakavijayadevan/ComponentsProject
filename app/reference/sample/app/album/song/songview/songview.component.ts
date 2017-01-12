// songview.component.js
import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
import { AlbumCollection } from '../../../shared/models/album';
import { AlbumJson } from '../../../shared/json/album.json';
import { SongService } from '../../../shared/services/song.service';
import { AlbumService } from '../../../shared/services/album.service';
import { LoginService } from '../../../shared/services/login.service';
import { SongJson } from '../../../shared/json/song.json';
import { SongMoodJson } from '../../../shared/json/song.json/songmood.json';
import { LangDisplayComponent } from '../../../shared/components/lang.display.component/lang.display.component';
import { LoadingIndicatorComponent } from '../../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../../shared/models/error';

import { SongValidators } from '../../../shared/validators/song.validation';
import { UrlValidators } from '../../../shared/validators/url.validation';
import { CreditJson } from '../../../shared/json/song.json/credit.json';

@Component({
    selector: 'dpd-song-view',
    templateUrl: 'src/app/album/song/songview/songview.component.html',
    styleUrls: ['src/app/album/song/songview/songview.component.css'],
    directives: [NgIf, LangDisplayComponent, LoadingIndicatorComponent],
    providers: [SongService, AlbumService, AlbumJson, SongJson, SongValidators, UrlValidators, CreditJson, SongMoodJson]
})

export class SongViewComponent implements OnInit {

    @Input('viewlang') songViewLang: string;
    @Input('albumid') albumId: string;
    @Input('songid') songId: string;
    @Output('error') onerror = new EventEmitter();

    private albumRootObject: AlbumCollection;
    private songRoot: any;
    private song: any;
    public loginData: LoginDataInterface;
    public loggedIn: Boolean;
    private isPublished: boolean;
    private isEnableBtnPublished: boolean;
    private isLoading: boolean = false;
    private error: Error;
    private validationArr: string[] = [];
    private songMoodSelectOption: any;
    private songMoodData: any;

    constructor(private _router: Router, private _auth: Auth, private _songJson: SongJson,
        private _songService: SongService, private _albumService: AlbumService, private _albumJson: AlbumJson, private _songValidation: SongValidators, private _songMoodJson: SongMoodJson) {

        let self = this;
        try {
            this.loginData = this._auth.getLoginStatus();
            this.loggedIn = this._auth.loggedIn;

            let albumData = _albumJson.getJson();

            self.albumRootObject = albumData;
            self.songRoot = _songJson.getDetailedJson();
            self.song = _songJson.getJson().song;
            self.songMoodSelectOption = _songMoodJson.getSongMood();

            this.songViewLang = "en";
            toastr.options = { positionClass: 'toast-bottom-right', }
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {
            self.isLoading = true;
            if (self.songId) {
                let songSearchObj = { song_id: self.songId }
                self._songService.getSongBySongId(JSON.stringify(songSearchObj))
                    .subscribe(data => self.SuccessOnGetSong(data),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnGetSong(result: any) {
        let self = this;
        try {
            self.isLoading = false;
            self.songRoot = result.data;
            self.songMoodData = self.songMoodSelectOption[result.data.data.song.mood.id].name;
            result.data.data.song.info["song_moods"] = [
                {
                    "name": self.songMoodData
                }];
            
            self.song = result.data.data.song;
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
                if (customError.error[0].errorCode == "1020") {
                    this._auth.logout();
                    router.navigate(['Login']);
                } else if (customError && customError.status == "1021") {
                    localStorage.setItem("id_token", "");
                    router.navigate(["Home"]);
                }

                let servererror = new Error();
                servererror.title = 'Server Error';
                servererror.messages = ['Error on getting the song!'];
                self.onerror.emit({ value: servererror });
            }
        } catch (error) {
            this.appError(error);
        }
    }

    publishSong() {
        let self = this;
        try {
            self.isLoading = true;
            if (this.songRoot.published_status == 1) {
                let saveSongData = {
                    "album_id": self.albumId,
                    "song_id": self.songId,
                    "data": self.songRoot.data,
                };

                let result = self.requestToPublishValidation(saveSongData);

                if (result.length == 0) {
                    let data = { song_id: self.songId };
                    this._songService.publishedSong(data).subscribe(
                        data => self.SuccessOnPublish(data),
                        error => self.ErrorOnPreview(error));
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    previewSongPublish(server: string) {
        let self = this;
        try {
            self.isLoading = true;
            let data = {
                song_id: self.songId,
                album_id: self.albumId,
                server: server
            };
            let saveSongData = {
                "album_id": self.albumId,
                "song_id": self.songId,
                "data": self.songRoot.data,
            };

            let result = self.requestToPublishValidation(saveSongData);

            if (result.length == 0) {
                this._songService.previewSong(JSON.stringify(data)).subscribe(
                    data => self.SuccessOnPreview(data),
                    error => self.ErrorOnPreview(error));
            }
        } catch (error) {
            this.appError(error);
        }
    }
    public requestToPublishValidation(result: any) {
        let self = this;
        self.validationArr = [];
        self.validationArr = self._songValidation.SongValid(result);
        return self.validationArr;
    }

    public SuccessOnPublish(result: any) {
        let self = this;
        try {
            self.isLoading = false;
            self.songRoot = result.data;
            self.song = result.data.data.song;
            var publishData = JSON.parse(result.data.publish_data);
            window.open(publishData.url);
            toastr.success('Publish Success');
        } catch (error) {
            this.appError(error);
        }
    }
    public SuccessOnPreview(result: any) {
        let self = this;
        try {
            self.isLoading = false;
            var previewData = JSON.parse(result.data.preview_data);
            window.open(previewData.url);
            toastr.success('Preview Success');
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
