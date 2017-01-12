// albumlist.component.js
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate, RouteParams } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { DashboardLayoutComponent } from '../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../auth_module/auth/check_auth';
import { Auth } from '../../auth_module/auth/auth';
import { AlbumService } from '../../shared/services/album.service';
import { RootObject, Datum } from '../../shared/models/album.response';
import { RadioButtonComponent } from '../../shared/components/radiobutton.component/radiobutton.component';
import { RadioButtonPros } from '../../shared/models/radiobutton';
import { AlbumFormComponent } from './albumform/albumform.component';
import { LangJson } from '../../shared/json/lang.json';

@Component({
    selector: 'home',
    templateUrl: 'src/app/album/addalbum/addalbum.component.html',
    styleUrls: ['src/app/album/addalbum/addalbum.component.css'],
    directives: [DashboardLayoutComponent, NgIf, RadioButtonComponent, AlbumFormComponent],
    providers: [AlbumService, LangJson]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let _router: Router;
    return checkAuth(next, previous, _router);
})

export class AddAlbumComponent implements OnInit {

    private languageRadioOption: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    private language: string;
    private albumFormLang: string;
    private albumId: string;

    constructor(private _router: Router, private _auth: Auth, private _routeParams: RouteParams, private _albumService: AlbumService, private _langJson: LangJson) {
        let self = this;
        self.albumId = self._routeParams.get('albumid');
        this.languageRadioOption = _langJson.getJson();
        this.albumFormLang = _langJson.english;
    }

    ngOnInit() {
        let self = this;
    }

    langSelect(event: any) {
        let self = this;
        this.albumFormLang = self.languageRadioOption[event.index].option.value;
    }

}
