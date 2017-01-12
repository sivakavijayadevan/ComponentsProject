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
export class AlbumService {

    constructor(private _http: Http, private _httpServices: HttpServices) {
    }

    getAlbum(data: string) {    
        return this._httpServices.PostHttp(data, 'getalbumlist')
            .catch(this.handleError);
    }

    getAlbumById(album_id: any) {
        let data = { album_id: album_id };

        return this._httpServices.PostHttp(JSON.stringify(data), 'getalbum')
            .catch(this.handleError);
    }

    requsetPublishedAlbum(data: any) {
        return this._httpServices.PutHttp(data, 'requsetpublishedalbum')
            .catch(this.handleError);
    }

    publishedAlbum(data: string) {
        return this._httpServices.PutHttp(data, 'publishedalbum')
            .catch(this.handleError);
    }

    getAlbumsearch(data: string) {
        return this._httpServices.PostHttp(data, 'getalbum')
            .catch(this.handleError);
    }

    addAlbum(data: string) {
        return this._httpServices.PostHttp(data, 'addalbum')
            .catch(this.handleError);
    }

    editAlbum(data: string) {
        return this._httpServices.PutHttp(data, 'updatealbum')
            .catch(this.handleError);
    }

    filterAlbum(data: any) {
        return this._httpServices.PostHttp(data, 'filteralbum')
            .catch(this.handleError);
    }

    sortAlbum(data: any) {
        return this._httpServices.PostHttp(data, 'sortalbum')
            .catch(this.handleError);
    }

    searchAlbum(data: any) {
        return this._httpServices.PostHttp(data, 'searchalbum')
            .catch(this.handleError);
    }

    handleError(error: any) {
        return Observable.throw(error || null);
    }

    checkDifferentObject(data: any) {
        return this._httpServices.PostLocalHttp(data, 'checkdifferentsalbum')
            .catch(this.handleError);
    }

}
