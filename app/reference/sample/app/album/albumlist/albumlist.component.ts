// albumlist.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../auth_module/auth/auth';
import { LoginService } from '../../shared/services/login.service';
import { AlbumService } from '../../shared/services/album.service';
import { RootObject, Datum } from '../../shared/models/album.response';
import { AlbumPagingParam } from '../../shared/models/album';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import { LoadingIndicatorComponent } from '../../shared/components/loading.component/loadingindicator.component';
import { Error} from '../../shared/models/error';
import { ErrorComponent } from '../../shared/components/error.component/error.component';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/albumlist/albumlist.component.html',
    styleUrls: ['src/app/album/albumlist/albumlist.component.css'],
    directives: [DashboardLayoutComponent, PaginationControlsCmp, ROUTER_DIRECTIVES, NgIf, ErrorComponent],
    providers: [AlbumService, LoginService, PaginationService],
    pipes: [PaginatePipe]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class AlbumListComponent implements OnInit {
    private albumList: Array<Datum> = new Array<Datum>();
    public loginData: LoginDataInterface;
    public loggedIn: Boolean;
    public isLoading: boolean = false;

    public sortOrder: number = 0;
    public sortBy: string = "created_date";
    public searchBy: string = "";
    public filterBy: number = -1;

    public p: number = 1;
    public total: number;
    public itemPerPage: number = 10;

    private error: Error;

    constructor(private _router: Router, private _auth: Auth, private _albumService: AlbumService) {
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
            self.GetAlbum();
        } catch (error) {
            this.appError(error);
        }
    }

    GetAlbum(filterkey: number = -1, sortkey: string = "created_date", searchkey: string = "", page: number = 1) {
        let self = this;
        try {
            self.filterBy = filterkey;
            self.sortBy = sortkey;
            self.searchBy = searchkey;
            self.p = page;
            self.isLoading = true;

            let param = new AlbumPagingParam();
            param.offset = (self.p - 1) * self.itemPerPage;
            param.limit = self.itemPerPage;

            if (self.filterBy >= 0) {
                param.published_status = self.filterBy;
            }
            if (self.sortBy) {
                param.sorted_by = self.sortBy;
                param.sorted_order = (self.sortOrder) ? "ASC" : "DESC";
            }
            if (self.searchBy) {
                param.title = self.searchBy;
            }

            self._albumService.getAlbum(JSON.stringify(param)).subscribe(
                data => self.SuccessOn(data),
                error => self.ErrorOn(error, self._router));
        } catch (error) {
            this.appError(error);
        }
    }

    GetPage(page: number) {
        let self = this;
        try {
            self.GetAlbum(self.filterBy, self.sortBy, self.searchBy, page);
        } catch (error) {
            this.appError(error);
        }
    }

    public SuccessOn(result: any) {
        let self = this;
        try {
            self.isLoading = false;

            result.data.albumlist.forEach(function (datas: Datum) {
                datas.songOpen = false;
            });            
            self.albumList = result.data.albumlist;
            self.total = result.data.filteredcount;
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

    GoToSong(albumId: any) {
        this._router.navigate(["SongList", { albumid: albumId }]);
    }

    GoToAlbum(albumId: any) {
        localStorage.setItem("albumid", albumId);
        this._router.navigate(["AlbumDetail"]);
    }

    EditAlbum(albumId: any) {
        this._router.navigate(['EditAlbum', { albumid: albumId }]);
    }

    toggleSort() {
        let self = this;
        try {
            self.sortOrder = (this.sortOrder) ? 0 : 1;
            self.GetAlbum(self.filterBy, self.sortBy, self.searchBy, 1);
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
