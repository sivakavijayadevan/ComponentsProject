import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';

@Component({
    selector: 'dpd-lang-select',
    templateUrl: 'src/app/shared/components/lang.select.component/lang.select.component.html',
    styleUrls: ['src/app/shared/components/lang.select.component/lang.select.component.css'],
    providers: [LangJson]
})

export class LangSelectComponent implements OnInit {
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
    * lable value.
    */
    @Input('displayname') displayName: string;

    /**
    * select option value.
    */
    @Input('selectoption') selectOptions: any;


    /**
    * lable visiblity.
    */
    @Input('lablevisiblity') lableVisible: Boolean = true;

    /**
     * input placeholder.
     */
    @Input('placeholder') placeHolder: string;

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

    @Input('optionkey') optionKey: string = "value";

    @Input('optiondisplaykey') optionDisplayKey: string = "displayname";

    @Input('updatekey') updateKey: string;

    @Input('singlevalue') singleValue: boolean = false;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();
    private loginData: any;


    constructor(private _langJson: LangJson, private _auth: Auth) {
        this.loginData = this._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;
        if (!self.placeHolder) {
            self.placeHolder = self.displayName;
        }
    }

    addInput(event: any, index: number) {
        let self = this;
        self.inputValue.push(self._langJson.getLangJaonWithId(self.selectOptions));
    }

    removeInput(event: any, index: number) {
        let self = this;
        this.inputValue.splice(index, 1);
    }

    selectedValue(event: any, index: number) {
        let self = this;
        var data = self.selectOptions.filter(function (params: any) {
            return params[self.optionKey] == event.target.value;
        });

        if (data && data.length > 0 && self.updateKey != "lyric_languages") {
            self.inputValue = data[0];
        }

        self.dataChange.emit({
            value: data[0],
            key: self.updateKey,
            index: index
        });

    }
}
