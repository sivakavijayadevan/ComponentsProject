import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CustomRouterOutlet } from './shared/directives/custom-router-outlet';
import { checkAuth } from './auth_module/auth/check_auth';
import { LoginComponent } from './auth_module/login/login.component';
import { SignupComponent } from './auth_module/signup/signup.component';
import { AlbumListComponent } from './album/albumlist/albumlist.component';
import { AlbumDetailComponent } from './album/albumdetail/albumdetail.component';
import { AddAlbumComponent } from './album/addalbum/addalbum.component';
import { SongFormComponent } from './album/song/addsong/songform/songform.component';
import { SongDetailComponent } from './album/song/songdetail/songdetail.component';
import { SongListComponent } from './album/song/songlist/songlist.component';
import { ProfileComponent } from './auth_module/login/change_password/password.component';


@Component({
    selector: 'app-container',
    templateUrl: '../src/app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    { path: '/ablumlist', as: 'AlbumList', component: AlbumListComponent, useAsDefault: true },
    { path: '/ablumdetail', as: 'AlbumDetail', component: AlbumDetailComponent },
    { path: '/songlist/:albumid', as: 'SongList', component: SongListComponent },
    { path: '/addalbum', as: 'AddAlbum', component: AddAlbumComponent },
    { path: '/editalbum/:albumid', as: 'EditAlbum', component: AddAlbumComponent },
    { path: '/addsong/:albumid', as: 'AddSong', component: SongFormComponent },
    { path: '/songdetail/:albumid/:songid', as: 'SongDetail', component: SongDetailComponent },
    { path: '/editsong/:albumid/:songid', as: 'EditSong', component: SongFormComponent },
    { path: '/login', as: 'Login', component: LoginComponent },
    { path: '/signup', as: 'Signup', component: SignupComponent },
    { path: '/profile', as: 'Profile', component: ProfileComponent },
    { path: '/**', redirectTo: ['AlbumList'] }
])
export class AppComponent {
    constructor() {
    }
}
