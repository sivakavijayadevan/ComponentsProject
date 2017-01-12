import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { ValidatorComponent } from '../../../shared/components/validator.component/validator.component';
import { UrlValidation } from '../../../shared/pipes/urlvalidation.pipe';
import { Auth } from '../../../auth_module/auth/auth';

@Component({
    selector: 'dpd-lang-input',
    templateUrl: 'src/app/shared/components/lang.input.component/lang.input.component.html',
    styleUrls: ['src/app/shared/components/lang.input.component/lang.input.component.css'],
    directives: [ValidatorComponent],
    providers: [LangJson],
    pipes: [UrlValidation]
})

export class LangInputComponent implements OnInit {
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
    * lable visiblity.
    */
    @Input('lablevisiblity') lableVisible: Boolean = true;

    /**
     * input type.
     */
    @Input('inputtype') inputType: string = 'text';

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

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    @Input('max') max: number = 14;

    @Input('min') min: number = 0;

    @Input('readonly') readonly: boolean = false;

    @Input('validate') validate: string = "";

    private languageArray: any[];
    private loginData: any;

    constructor(private _langJson: LangJson, private _auth: Auth) {
        this.languageArray = this._langJson.getLangArray();
        this.loginData = this._auth.getLoginStatus();
        this.readonly = (this.loginData.roleid == 2) ? true : false;
    }

    ngOnInit() {
        let self = this;
        if (!self.placeHolder) {
            self.placeHolder = self.displayName;
        }
    }

    addInput(event: any, index: number) {
        let self = this;
        self.inputValue.push(self._langJson.getLangJson());
    }

    urlValidation(url: string) {
        let myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
        if (!myRegExp.test(url)) {
        } else {
        }
    }

    removeInput(event: any, index: number) {
        let self = this;
        this.inputValue.splice(index, 1);
    }

    clearValue(event: any, index: number) {
        let self = this;
        this.inputValue[index].name.en = "";
        this.inputValue[index].name.ta = "";
        this.inputValue[index].name.hi = "";
        this.inputValue[index].name.te = "";
    }

    onKeyDown(event: any) {
        event.preventDefault();
    }
}
