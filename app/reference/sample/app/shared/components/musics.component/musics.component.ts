import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { Auth } from '../../../auth_module/auth/auth';

import { LangInputComponent } from '../../../shared/components/lang.input.component/lang.input.component';
import { LangTextAreaComponent } from '../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../shared/components/lang.select.component/lang.select.component';

import { SongJson } from '../../../shared/json/song.json';

@Component({
    selector: 'dpd-lang-musics',
    templateUrl: 'src/app/shared/components/musics.component/musics.component.html',
    styleUrls: ['src/app/shared/components/musics.component/musics.component.css'],
    directives: [LangInputComponent, LangTextAreaComponent, LangSelectComponent],
    providers: [LangJson, SongJson]
})

export class MusicsComponent implements OnInit {
    /**
     * language of the input is display.
     */
    @Input('multilingual') multilingualAttr: string;

    /**
     * model object which has to be binded in input element.
     */
    @Input('inputvalue') inputValue: any;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private CriticsArray: any;
    private loginData: any;

    constructor(private _langJson: LangJson, private _songJson: SongJson, private _auth: Auth) {
        let self = this;
        self.inputValue = self._songJson.getSongMusicsObjArray();
        self.loginData = self._auth.getLoginStatus();
        self.CriticsArray = self._songJson.getSongCriticsArray();
    }

    ngOnInit() {
        let self = this;
        console.log("music", self.inputValue);
    }

    AddMusic() {
        let self = this;
        self.inputValue.push(self._songJson.getSongMusicsObj());
    }

    // ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    //     console.log(changes);
    //     for (let propName in changes) {
    //         let chng = changes[propName];
    //         console.log(chng);
    //         let cur = JSON.stringify(chng.currentValue);
    //         let prev = JSON.stringify(chng.previousValue);
    //     }
    // }

    removeInput(event: any, index: number) {
    }
}
