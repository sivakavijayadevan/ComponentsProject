import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';
import { LangInput, LangInputLable } from '../../models/langelement';
import { ValidatorComponent } from '../../../shared/components/validator.component/validator.component';

@Component({
    selector: 'dpd-lang-text-area',
    templateUrl: 'src/app/shared/components/lang.textarea.component/lang.textarea.component.html',
    styleUrls: ['src/app/shared/components/lang.textarea.component/lang.textarea.component.css'],
    directives: [ValidatorComponent],
})

export class LangTextAreaComponent implements OnInit {
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

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private loginData: any;

    constructor(private _router: Router, private _auth: Auth) {
        this.loginData = this._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;
        if (!self.placeHolder) {
            self.placeHolder = self.displayName;
        }
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
