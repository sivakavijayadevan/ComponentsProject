// songlist.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { SongService } from '../../../shared/services/song.service';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
import { LoginService } from '../../../shared/services/login.service';
import { AlbumViewComponent } from '../../../album/albumview/albumview.component';
import { LoadingIndicatorComponent } from '../../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../../shared/models/error';
import { ErrorComponent } from '../../../shared/components/error.component/error.component';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/song/songlist/songlist.component.html',
    styleUrls: ['src/app/album/song/songlist/songlist.component.css'],
    directives: [DashboardLayoutComponent, ROUTER_DIRECTIVES, NgIf, AlbumViewComponent, ErrorComponent, RouterLink],
    providers: [SongService, LoginService]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class SongListComponent implements OnInit {
    public loginData: LoginDataInterface;
    public loggedIn: Boolean;
    private songList: Array<any> = new Array<any>();
    private albumId: string;
    private isLoading: boolean = false;
    private error: Error;

    constructor(private _router: Router, private _auth: Auth, private _routeParams: RouteParams, private _songService: SongService) {
        try {
            this.loginData = this._auth.getLoginStatus();
            this.loggedIn = this._auth.loggedIn;
        } catch (error) {
            this.appError(error);
        }
    }

    ngOnInit() {
        let self = this;
        try {
            self.getSongByAlbum();
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOn(result: any) {
        try {
            this.isLoading = false;
            this.songList = result.data;
        } catch (error) {
            this.appError(error);
        }
    }

    public viewSong(songId: string) {
        let self = this;
        self._router.navigate(['SongDetail', { albumid: self.albumId, songid: songId }]);
    }

    public editSong(songId: string) {
        let self = this;
        self._router.navigate(['EditSong', { albumid: self.albumId, songid: songId }]);
    }

    private AddSong() {
        let self = this;
        self._router.navigate(['AddSong', { albumid: self.albumId }]);
    }

    public getSongByAlbum(filter: number = -1) {
        let self = this;
        try {
            self.isLoading = true;
            self.albumId = self._routeParams.get('albumid');
            let data = {};
            if (filter < 0) {
                data = { album_id: self.albumId };
            }
            else if (filter >= 0) {
                data = { album_id: self.albumId, published_status: filter };
            }
            self._songService.getSongByAlbum(JSON.stringify(data)).subscribe(
                data => self.SuccessOn(data),
                error => self.ErrorOn(error, self._router));
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
                servererror.messages = ['Error on loading this page!'];
                self.error = servererror;
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
    }
}
