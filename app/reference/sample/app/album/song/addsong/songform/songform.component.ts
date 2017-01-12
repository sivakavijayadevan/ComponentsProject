// songlist.component.js
/// <reference path="../../../../../toastr.d.ts" />
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../../../auth_module/auth/auth';
import { RadioButtonPros } from '../../../../shared/models/radiobutton';

import { RootObject, Datum } from '../../../../shared/models/song.response';
import { LangInputObject } from '../../../../shared/models/langelement';
import { AlbumCollection } from '../../../../shared/models/album';

import { RadioButtonComponent } from '../../../../shared/components/radiobutton.component/radiobutton.component';
import { LangInputComponent } from '../../../../shared/components/lang.input.component/lang.input.component';
import { LangTextAreaComponent } from '../../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../../shared/components/lang.select.component/lang.select.component';
import { LangLyricsComponent } from '../../../../shared/components/lang.lyrics.component/lang.lyrics.component';
import { CriticsComponent } from '../../../../shared/components/critics.component/critics.component';
import { MusicsComponent } from '../../../../shared/components/musics.component/musics.component';
import { SortingComponent } from '../../../../shared/components/sorting.component/sorting.component';
import { ValidatorComponent } from '../../../../shared/components/validator.component/validator.component';
import { DateTimeComponent } from '../../../../shared/components/datetime.component/datetime.component';
import { DurationComponent } from '../../../../shared/components/duration.component/duration.component';

import { AlbumService } from '../../../../shared/services/album.service';
import { SongService } from '../../../../shared/services/song.service';
import { SongJson } from '../../../../shared/json/song.json';
import { LanguageJson } from '../../../../shared/json/language.json/language.json';
import { SongTypeJson } from '../../../../shared/json/song.json/songtype.json';
import { SongModeJson } from '../../../../shared/json/song.json/songmode.json';
import { LangJson } from '../../../../shared/json/lang.json';
import { CreditJson } from '../../../../shared/json/song.json/credit.json';
import { UrlValidators } from '../../../../shared/validators/url.validation';
import { SongValidators } from '../../../../shared/validators/song.validation';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../../../shared/models/error';
import { ErrorComponent } from '../../../../shared/components/error.component/error.component';
import { AlbumViewComponent } from '../../../../album/albumview/albumview.component';

@Component({
    selector: 'song-form',
    templateUrl: 'src/app/album/song/addsong/songform/songform.component.html',
    styleUrls: ['src/app/album/song/addsong/songform/songform.component.css'],
    directives: [DashboardLayoutComponent, NgIf, LangInputComponent, LangTextAreaComponent, LangSelectComponent, LangLyricsComponent, CriticsComponent, MusicsComponent, SortingComponent, RadioButtonComponent, ValidatorComponent, DateTimeComponent, DurationComponent, ErrorComponent, AlbumViewComponent],
    providers: [SongService, SongJson, LanguageJson, SongTypeJson, SongModeJson, LangJson, CreditJson, UrlValidators, SongValidators, AlbumService]
})

export class SongFormComponent implements OnInit {
    private languageRadioOption: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    @Input('albumid') albumId: string;
    @Input('albumdetail') albumDetail: any;
    @Input('songid') songId: string;


    @Output('selectChange') selectedValue = new EventEmitter();

    private isLoading: boolean = false;
    private LangControle: any;
    private albumInfo: any;
    private albumRootObject: AlbumCollection;
    private songRootInfo: any;
    private songRootObject: any;
    private songInfoJson: any;
    private langSelectOption: any;
    public loginData: any;
    private songTypeSelectOption: any;
    private songModeSelectOption: any;
    private callerToneOption: any;
    private serverVideoOptions: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    private serverSeleted: string;
    private responseresult: string[];
    messages: string;
    private itemArray: string[];
    private infoArray: string[];
    private validationArr: string[] = [];
    private langArr: string[];
    private lyricLangOption: any;
    private changeDate: any;
    private unChangeDate: any;
    private isOn: boolean = false;
    private error: Error;
    private languageId: string = "en";

    constructor(private _router: Router,
        private _auth: Auth,
        private _songService: SongService,
        private _albumService: AlbumService,
        private _songJson: SongJson,
        private _languageJson: LanguageJson,
        private _songTypeJson: SongTypeJson,
        private _songModeJson: SongModeJson,
        private _langJson: LangJson,
        private _creditJson: CreditJson,
        private _routeParams: RouteParams,
        private _urlValidation: UrlValidators,
        private _songValidation: SongValidators) {
        let self = this;
        try {

            self.albumId = self._routeParams.get('albumid');
            self.songId = self._routeParams.get('songid') ? self._routeParams.get('songid') : "";
            this.languageRadioOption = _langJson.getJson();
            self.songRootInfo = _songJson.getDetailedJson();
            self.songRootObject = _songJson.getJson();
            self.loginData = _auth.getLoginStatus();
            self.langSelectOption = _languageJson.getLanguageJson();
            self.lyricLangOption = _languageJson.getLyricLanguageJson();
            self.callerToneOption = _languageJson.getCallerToneJson();
            self.songTypeSelectOption = _songTypeJson.getSongType();
            self.songModeSelectOption = _songModeJson.getSongMode();
            self.serverVideoOptions = _langJson.getServerJson();
            self.serverSeleted = 'aws';
            self.itemArray = ['video', 'lyric', 'audio', 'making', 'karaoke'];
            self.infoArray = ['instruments', 'thaalams', 'lyric_genres', 'music_genres', 'best_seasons_to_listen', 'lyric_styles', 'best_times_to_listen', 'raagams'];
            self.langArr = _langJson.getLangArray();
            toastr.options = { positionClass: 'toast-bottom-right', };
        } catch (error) {
            this.appError(error);
        }
    }

    langSelect(event: any) {
        let self = this;
        try {
            self.languageId = self.languageRadioOption[event.index].option.value;
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {

            if (self.songId) {
                let songSearchObj = { song_id: self.songId };
                self.isLoading = true;
                self._songService.getSongBySongId(JSON.stringify(songSearchObj))
                    .subscribe(data => self.SuccessOnGetSong(data),
                    error => self.ErrorOn(error, self._router));
            }
            if (self.albumId) {
                self.isLoading = true;
                self._albumService.getAlbumById(self.albumId).subscribe(
                    data => self.SuccessOnGetAlbum(data),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnGetSong(result: any) {
        let self = this;
        try {
            console.log(self.songRootInfo);
            self.isLoading = false;
            self.songRootInfo = result.data;
            if (!('raagams' in result.data.data.song.info)) {
                result.data.data.song.info["raagams"] = [
                    {
                        "name": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": "",
                        }
                    }
                ];
            }

            self.unChangeDate = Object.assign({}, result.data.data);
            self.songRootObject = result.data.data
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnGetAlbum(result: any) {
        let self = this;
        try {
            self.isLoading = false;
            self.albumInfo = result.data;
            console.log("album", self.albumInfo.data.album);
        } catch (error) {
            this.appError(error);
        }
    }

    serverSelect(event: any) {
        let self = this;
        try {
            this.serverSeleted = self.serverVideoOptions[event.index].option.value;
        } catch (error) {
            this.appError(error);
        }
    }

    public requestToPublishValidation(result: any) {
        let self = this;
        try {
            self.validationArr = [];
            self.validationArr = self._songValidation.SongValid(result);
            let apperror = new Error();
            apperror.title = "Validation Error!";
            apperror.messages = self.validationArr;
            self.error = apperror;
            return self.validationArr;
        } catch (error) {
            this.appError(error);
        }
    }

    public saveEditValidation(result: any) {
        let self = this;
        try {
            self.validationArr = [];
            var results = self._songValidation.SongRequiredValid(result);
            self.validationArr = results;
            let apperror = new Error();
            apperror.title = "Validation Error1!";
            apperror.messages = self.validationArr;
            self.error = apperror;
            toastr.info('Validation Success');
            return self.validationArr;


        } catch (error) {
            this.appError(error);
        }
    }

    public removeEmpty() {
        let self = this;
        self.info();
        self.musics();
        self.credit();
        self.critics();
        self.callertune();
        toastr.info('Removed empty nodes.');
    }

    public addCallerTune() {
        let self = this;
        try {
            self.songRootObject.song.callertunes.push(self._songJson.getCallerTune());
        } catch (error) {
            this.appError(error);
        }
    }

    selectionChange(event: any, index: number) {
        let self = this;
        try {
            if (event.value) {
                if (event.key == 'language') {
                    self.songRootObject['song'][event.key] = event.value;
                } else if (event.key == 'provider') {
                    self.songRootObject['song']['callertunes'][index][event.key] = event.value;
                } else if (event.key == 'lyric_languages') {
                    self.songRootObject['song']['info'][event.key][event.index] = event.value;
                } else if (event.key == 'author') {
                    self.songRootObject['song']['critics'][event.index][event.key] = event.value;
                } else if (event.key == 'rating') {
                    self.songRootObject['song']['critics'][event.index][event.key] = event.value;
                    self.songRootObject['song']['critics'][event.index]['review']["overall"].score = event.value;
                } else {
                    self.songRootObject['song'][event.key] = event.value;
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    dateChangeEvent(event: any) {
        let self = this;
        try {
            let datewithms = event.changedDate.slice(0, -1);
            if (event && event.key === 'launch_date') {
                self.songRootObject['song']['info'][event.key] = datewithms + ".000Z";
            } else {
                self.songRootObject['song'][event.key] = datewithms + ".000Z";
            }
        } catch (error) {
            this.appError(error);
        }
    }

    copyFrom(langKeyFrom: string, langKeyTo: string) {
        let self = this;
        try {
            for (var key in self.songRootObject['song']) {
                if (typeof self.songRootObject['song'][key] === "object" && !self.songRootObject['song'][key].length && langKeyFrom in self.songRootObject['song'][key]) {
                    self.songRootObject['song'][key]['hi'] = self.songRootObject['song'][key][langKeyFrom];
                    self.songRootObject['song'][key]['te'] = self.songRootObject['song'][key][langKeyFrom];
                }
            }
            self.copyFromObject(langKeyFrom, langKeyTo, "info");
            self.copyFromObject(langKeyFrom, langKeyTo, "credit");
            self.copyFromCritics(langKeyFrom, langKeyTo);
            self.copyFromMusic(langKeyFrom, langKeyTo);

            toastr.success('copy form english success.');
            self.isOn = false;
        } catch (error) {
            this.appError(error);
        }
    }

    copyFromObject(langKeyFrom: string, langKeyTo: string, key: string) {
        let self = this;
        try {
            for (var infoKey in self.songRootObject['song'][key]) {
                if (infoKey !== "lyric_languages" && infoKey !== "duration" && infoKey !== "launch_date" && typeof self.songRootObject['song'][key][infoKey] === "object") {
                    self.songRootObject['song'][key][infoKey].forEach(function (params: any) {
                        console.log("infos", params);
                        if (langKeyFrom in params.name) {
                            params.name['hi'] = params.name[langKeyFrom];
                            params.name['te'] = params.name[langKeyFrom];
                        }
                    });
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    copyFromCritics(langKeyFrom: string, langKeyTo: string) {
        let self = this;
        try {
            self.songRootObject['song'].critics.forEach(function (params: any) {
                console.log("critics", params);
                for (var key in params) {
                    if (key === "review") {
                        params[key].vocal.comment['hi'] = params[key].vocal.comment[langKeyFrom];
                        params[key].instrument.comment['hi'] = params[key].instrument.comment[langKeyFrom];
                        params[key].overall.comment['hi'] = params[key].overall.comment[langKeyFrom];
                        params[key].lyric.comment['hi'] = params[key].lyric.comment[langKeyFrom];
                        params[key].tune.comment['hi'] = params[key].tune.comment[langKeyFrom];

                        params[key].vocal.comment['te'] = params[key].vocal.comment[langKeyFrom];
                        params[key].instrument.comment['te'] = params[key].instrument.comment[langKeyFrom];
                        params[key].overall.comment['te'] = params[key].overall.comment[langKeyFrom];
                        params[key].lyric.comment['te'] = params[key].lyric.comment[langKeyFrom];
                        params[key].tune.comment['te'] = params[key].tune.comment[langKeyFrom];
                    }
                }
            });
        } catch (error) {
            this.appError(error);
        }
    }

    copyFromMusic(langKeyFrom: string, langKeyTo: string) {
        let self = this;
        try {
            self.songRootObject['song'].musics.forEach(function (params: any) {
                console.log("critics", params);
                params.instrument.name['te'] = params.instrument.name[langKeyFrom];
                params.instrument.name['hi'] = params.instrument.name[langKeyFrom];
                params.players.forEach(function (playerObj: any) {
                    playerObj.name['te'] = playerObj.name[langKeyFrom];
                    playerObj.name['hi'] = playerObj.name[langKeyFrom];
                })
            });
        } catch (error) {
            this.appError(error);
        }
    }

    backcall(event: any) {
        let self = this;
        try {
            self._router.navigate(['SongList', { albumid: self.albumId }]);
        } catch (error) {
            this.appError(error);
        }
    }

    durationChange(event: any) {
        try {
            console.log(event);
            this.songRootObject.song.info.duration = event.value;
            console.log(this.songRootObject);
        } catch (error) {
            this.appError(error);
        }
    }

    activeClick(status: boolean) {
        let self = this;
        try {
            self.songRootObject['song'].active = status;
        } catch (error) {
            this.appError(error);
        }
    }

    scrollToElement(element: any) {
        try {
            element.scrollIntoView();
        } catch (error) {
            this.appError(error);
        }
    }

    saveBtn(event: any) {
        let self = this;
        self.isOn = true;
        console.log('test');
        try {
            toastr.info('please wait ...');
            self.removeEmpty();
            let saveSongData = {
                "album_id": self.albumId,
                "data": self.songRootObject
            };
            console.log(self.songRootObject);
            let result = self.saveEditValidation(saveSongData);

            if (result.length == 0) {
                self.isLoading = true;
                self._songService.addSong(JSON.stringify(saveSongData))
                    .subscribe(data => self.SuccessOnAddOrEditSong(data, self._router, true),
                    error => self.ErrorOn(error, self._router));
            } else {
                self.isOn = false;
            }

        } catch (error) {
            this.appError(error);
        }
    }

    editBtn(event: any) {
        let self = this;
        self.isOn = true;
        try {
            var data = {
                "song_id": self.songId,
                changed: self.songRootObject
            }
            self._songService.checkDifferentObject(JSON.stringify(data))
                .subscribe(data => self.callEditOnSuccess(data),
                error => self.callEditError());

        } catch (error) {
            this.appError(error);
        }
    }

    callEditError() {
        toastr.info('No Changes in song');
        this.isOn = false;
    }

    callEditOnSuccess(status: boolean) {
        let self = this;
        toastr.info('please wait ...');
        self.removeEmpty();
        let saveSongData = {
            "song_id": self.songId,
            "album_id": self.albumId,
            "data": self.songRootObject,
            "published_status": 0
        };
        console.log(saveSongData);
        let result = self.saveEditValidation(saveSongData);
        if (result.length == 0) {
            self.isLoading = true;
            self._songService.editSongBySongId(JSON.stringify(saveSongData))
                .subscribe(data => self.SuccessOnAddOrEditSong(data, self._router, false),
                error => self.ErrorOn(error, self._router));
        } else {
            self.isOn = false;
        }
    }

    SuccessOnAddOrEditSong(result: any, router: Router, status: boolean) {
        let self = this;
        try {
            self.isLoading = false;
            self.songRootObject = result.data.data;
            self.unChangeDate = Object.assign({}, result.data.data);
            self.songRootInfo = result.data;
            toastr.success('Song update success.');
            if (status) {
                router.navigate(["SongList", { albumid: self.albumId }]);
            }
            self.isOn = false;
        } catch (error) {
            this.appError(error);
        }
    }

    ErrorOn(err: any, router: Router) {
        let self = this;
        try {
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
                    self.validationArr = self.responseresult;
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
            toastr.error('server error');
            self.isOn = false;
        } catch (error) {
            this.appError(error);
        }
    }

    requsetPublishSong() {
        let self = this;
        try {
            if (self.albumInfo.published_status !== 2) {
                let valerror = new Error();
                valerror.title = 'Validation Error';
                valerror.messages = ["Please publish the album"];
                self.error = valerror;
                return;
            }
            let saveSongData = {
                "album_id": self.albumId,
                "song_id": self.songId,
                "data": self.songRootObject,
            };

            let result = self.requestToPublishValidation(saveSongData);

            if (result.length == 0) {
                if (self.songRootInfo.published_status == 0) {
                    self.isLoading = true;
                    self._songService.requsetPublishedSong(JSON.stringify(saveSongData)).subscribe(
                        data => self.SuccessRequestToPublish(data),
                        error => self.ErrorOnPreview(error));
                }
            }
        } catch (error) {
            this.appError(error);
        }
    }

    downloadPublishJson() {
        let self = this;
        try {
            toastr.info('please wait ...');

            let saveSongData = {
                "album_id": self.albumId,
                "song_id": self.songId,
                "data": self.songRootObject,
                "download": true
            };

            let result = self.requestToPublishValidation(saveSongData);

            if (result.length == 0) {
                self.isLoading = true;
                self._songService.requsetPublishedSong(JSON.stringify(saveSongData)).subscribe(
                    data => self.DownloadPublishJson(data),
                    error => self.ErrorOn(error, self._router));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    downloadXML() {
        let self = this;
        try {
            toastr.info('please wait ...');

            let saveSongData = { "song_id": self.songId };

            self.isLoading = true;
            self._songService.downloadXML(JSON.stringify(saveSongData)).subscribe(
                data => self.downloadxml(data.data, self.songRootInfo.song_title),
                error => self.ErrorOn(error, self._router));

        } catch (error) {
            this.appError(error);
        }
    }

    SuccessRequestToPublish(result: any) {
        let self = this;
        self.isLoading = false;
        self.songRootObject = result.data.data;
        self.unChangeDate = Object.assign({}, result.data.data);
        self.songRootInfo = result.data;
        toastr.success('Song request to publish success.');
    }

    DownloadPublishJson(result: any) {
        let self = this;
        try {
            self.isLoading = false;
            result.data.data.song['album'] = self.albumInfo.data.album;
            self.downloadJson(result.data.data, result.data.song_title);
            toastr.success('Song request to publish success.');
        } catch (error) {
            this.appError(error);
        }
    }

    downloadJson(data: any, fileName: any) {
        try {
            let a: any = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var json = JSON.stringify(data),
                blob = new Blob([json], { type: 'application/json' }),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            toastr.success('json download success.');
        } catch (error) {
            this.appError(error);
        }
    }

    downloadxml(data: any, fileName: any) {
        let self = this;
        try {
            self.isLoading = false;
            let link: any = document.createElement('a');
            document.body.appendChild(link);
            link.href = 'data:application/zip;base64,' + data;
            link.target = '_blank';
            link.download = fileName + ".zip";
            link.click();
            document.body.removeChild(link);
            toastr.success('xml download success.');
        } catch (error) {
            this.appError(error);
        }
    }

    previewSongPublish() {
        let self = this;
        try {
            let saveSongData = {
                "album_id": self.albumId,
                "song_id": self.songId,
                "data": self.songRootObject,
            };

            let result = self.requestToPublishValidation(saveSongData);

            if (result.length == 0) {
                self.isLoading = true;
                let data = {
                    song_id: self.songId,
                    album_id: self.albumId
                };
                this._songService.previewSong(JSON.stringify(data)).subscribe(
                    data => self.SuccessOnPreview(data),
                    error => self.ErrorOnPreview(error));
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOnPreview(result: any) {
        let self = this;
        self.isLoading = false;
        var previewData = JSON.parse(result.data.preview_data);
        window.open(previewData.url);
        toastr.success('Preview Success');
        self.isOn = false;
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
                toastr.error('server error');

            }

        } catch (error) {
            this.appError(error);
        }
    }

    closeError() {
        let self = this;
        self.validationArr = [];
        self.messages = "";
        self.isOn = false;
    }

    public musics() {
        let self = this;
        try {
            let musicData = self.songRootObject.song.musics.filter(function (params: any) {
                if (params.instrument.name.en || params.instrument.name.ta || params.instrument.name.hi || params.instrument.name.te) {
                    var filledPlayer = params.players.filter(function (params: any) {
                        return params.name.en || params.name.ta || params.name.hi || params.name.te;
                    });
                    if (filledPlayer && filledPlayer.length > 0) {
                        params.players = filledPlayer;
                    } else {
                        params.players = [self._langJson.getLangJson()];
                    }
                    return true;
                } else {
                    var filledPlayer = params.players.filter(function (params: any) {
                        return params.name.en || params.name.ta || params.name.hi || params.name.te;
                    });

                    if (filledPlayer && filledPlayer.length > 0) {
                        params.players = filledPlayer;
                        return true;
                    } else {
                        params.players = [self._langJson.getLangJson()];
                        return false;
                    }
                }
            });

            if (musicData && musicData.length > 0) {
                self.songRootObject.song.musics = musicData;
            } else {
                self.songRootObject.song.musics = [self._songJson.getSongMusicsObj()];
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public info() {
        let self = this;
        try {
            ////lyric_languages.
            if (self.songRootObject.song.info.lyric_languages && self.songRootObject.song.info.lyric_languages.length > 0) {
                var completeData = self.songRootObject.song.info.lyric_languages.filter(function (params: any) {
                    return params.code || params.name;
                });
                if (completeData && completeData.length > 0) {
                    self.songRootObject.song.info.lyric_languages = completeData;
                } else {
                    let emptyData = [{
                        code: "",
                        name: ""
                    }];
                    self.songRootObject.song.info.lyric_languages = emptyData;
                }
            }

            self.infoArray.forEach(function (Key: string) {
                if (self.songRootObject.song.info[Key] && self.songRootObject.song.info[Key].length > 0) {
                    var completeData = self.songRootObject.song.info[Key].filter(function (params: any) {
                        return params.name.en || params.name.ta || params.name.hi || params.name.te;
                    });
                    if (completeData && completeData.length > 0) {
                        self.songRootObject.song.info[Key] = completeData;
                    } else {
                        self.songRootObject.song.info[Key] = [self._langJson.getLangJson()];
                    }
                }
            });
        } catch (error) {
            this.appError(error);
        }
    }

    public credit() {
        let self = this;
        try {
            let Keys = self._creditJson.getCreditKeys(self.songRootObject['display_rule']['entity']['credit']);
            Keys.forEach(function (Keys: any) {
                if (self.songRootObject.song.credit[Keys.key] && self.songRootObject.song.credit[Keys.key].length > 0) {
                    var completeData = self.songRootObject.song.credit[Keys.key].filter(function (params: any) {
                        return params.name.en || params.name.ta || params.name.hi || params.name.te;
                    });
                    if (completeData && completeData.length > 0) {
                        self.songRootObject.song.credit[Keys.key] = completeData;
                    } else {
                        self.songRootObject.song.credit[Keys.key] = [self._langJson.getLangJson()];
                    }
                }
            });
        } catch (error) {
            this.appError(error);
        }
    }

    public critics() {
        let self = this;
        try {
            let criticsData = self.songRootObject.song.critics.filter(function (params: any) {
                return params.rating ||
                    params.author.image ||
                    params.author.name.en ||
                    params.author.name.hi ||
                    params.author.name.ta ||
                    params.author.name.te ||

                    params.review.instrument.comment.en ||
                    params.review.instrument.comment.hi ||
                    params.review.instrument.comment.ta ||
                    params.review.instrument.comment.te ||
                    params.review.instrument.score ||

                    params.review.lyric.comment.en ||
                    params.review.lyric.comment.hi ||
                    params.review.lyric.comment.ta ||
                    params.review.lyric.comment.te ||
                    params.review.lyric.score ||

                    params.review.overall.comment.en ||
                    params.review.overall.comment.hi ||
                    params.review.overall.comment.ta ||
                    params.review.overall.comment.te ||
                    params.review.overall.score ||

                    params.review.tune.comment.en ||
                    params.review.tune.comment.hi ||
                    params.review.tune.comment.ta ||
                    params.review.tune.comment.te ||
                    params.review.tune.score ||

                    params.review.vocal.comment.en ||
                    params.review.vocal.comment.hi ||
                    params.review.vocal.comment.ta ||
                    params.review.vocal.comment.te ||
                    params.review.vocal.score;
            });

            if (criticsData && criticsData.length > 0) {
                self.songRootObject.song.critics = criticsData;
            } else {
                self.songRootObject.song.critics = [self._songJson.getSongCriticsObj()];
            }
        } catch (error) {
            this.appError(error);
        }
    }

    public callertune() {
        let self = this;
        try {
            let callerData = self.songRootObject.song.callertunes.filter(function (params: any) {
                if (params.provider.id.trim() && params.provider.name.trim()) {
                    return true;
                } else if (params.url.trim()) {
                    return true;
                }
                return false;
            });

            if (callerData && callerData.length > 0) {
                self.songRootObject.song.callertunes = callerData;
            } else {
                self.songRootObject.song.callertunes = [self._songJson.getCallerTune()];
            }
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
        self.isOn = false;

    }
}