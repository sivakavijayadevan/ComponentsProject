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
export class SongService {

    constructor(private _http: Http, private _httpServices: HttpServices) {
    }

    getSongByAlbum(data: string) {
        return this._httpServices.PostHttp(data, 'getsonglist')
            .catch(this.handleError);
    }

    addSong(data: string) {
        return this._httpServices.PostHttp(data, 'addsong')
            .catch(this.handleError);
    }

    getSongBySongId(data: string) {
        return this._httpServices.PostHttp(data, 'getsong')
            .catch(this.handleError);
    }

    editSongBySongId(data: string) {
        return this._httpServices.PutHttp(data, 'updatesong')
            .catch(this.handleError);
    }

    requsetPublishedSong(data: any) {
        return this._httpServices.PutHttp(data, 'requsetpublishedsong')
            .catch(this.handleError);
    }

    publishedSong(data: any) {
        return this._httpServices.PutHttp(JSON.stringify(data), 'publishedsong')
            .catch(this.handleError);
    }

    previewSong(data: string) {
        return this._httpServices.PostHttp(data, 'previewsong')
            .catch(this.handleError);
    }

    filterSong(data: any) {
        return this._httpServices.PostHttp(data, 'filtersong')
            .catch(this.handleError);
    }

    checkDifferentObject(data: any) {
        return this._httpServices.PostLocalHttp(data, 'checkdifferents')
            .catch(this.handleError);
    }

    downloadXML(data: any) {
        return this._httpServices.PostHttp(data, 'downloadxml')
            .catch(this.handleError);
    }

    handleError(error: any) {
        return Observable.throw(error || null);
    }

}
