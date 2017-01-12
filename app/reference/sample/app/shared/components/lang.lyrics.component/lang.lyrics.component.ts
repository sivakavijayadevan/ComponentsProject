import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';

@Component({
    selector: 'dpd-lang-lyrics',
    templateUrl: 'src/app/shared/components/lang.lyrics.component/lang.lyrics.component.html',
    styleUrls: ['src/app/shared/components/lang.lyrics.component/lang.lyrics.component.css'],
    providers: [LangJson]
})

export class LangLyricsComponent implements OnInit {
    /**
     * input with mutiple option set the input value as 'true'
     * default value 'false'
     */
    @Input('multiple') multipleAttr: boolean;

    /**
     * language of the input is display.
     */
    @Input('multilingual') multilingualAttr: string;

    /**
     * input element values with property like placeholder, value, type, selectoption in array.
     */
    @Input('langinput') inpuLang: Array<LangInput> = new Array<LangInput>();

    /**
     * input lable contol property like visiblity, displaytext. 
     */
    @Input('langinputlable') lableLang: LangInputLable;

    /**
     * model object which has to be binded in input element.
     */
    @Input('inputvalue') inputValue: any;

    /**
     * model object key this used to read the property of the model to display in input.
     * 
     * IMPORTANT.
     */
    @Input('valuekey') valueKey: string;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private loginData: any;

    constructor(private _router: Router, private _auth: Auth, private _langJson: LangJson) {
        this.loginData = this._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;
        console.log(self.inputValue);
        // if (self.inputValue && self.inputValue.length) {
        //     let type = self.inpuLang[0].type;
        //     let placeholder = self.inpuLang[0].placeholder;
        //     self.inpuLang = [];

        //     self.inputValue.forEach(function (params: any) {
        //         let addData = {
        //             type: type,
        //             placeholder: placeholder
        //         };
        //         self.inpuLang.push(addData);
        //     })
        // }
    }

    addInput(event: any, index: number) {
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
