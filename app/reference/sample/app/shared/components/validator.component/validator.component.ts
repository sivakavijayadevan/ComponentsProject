import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { ServerJson } from '../../../shared/json/server.json';
import { TrimSpace } from '../../../shared/pipes/trim.pipe';

@Component({
    selector: 'dpd-lang-validator',
    templateUrl: 'src/app/shared/components/validator.component/validator.component.html',
    styleUrls: ['src/app/shared/components/validator.component/validator.component.css'],
    providers: [LangJson, ServerJson],
    pipes: [TrimSpace]
})

export class ValidatorComponent implements OnInit {

    /**
     * model object which has to be binded in input element.
     */
    @Input('inputvalue') inputValue: any;

    /**
     * model object which has to be binded in input element.
     */
    @Input('validationtype') validationType: string;

    /**
     * model object key this used to read the property of the model to display in input.
     * 
     * IMPORTANT.
     */
    @Input('valuekey') valueKey: string;

    /**
     * model object key this used to read the property of the model to display in input.
     * 
     * IMPORTANT.
     */
    @Input('serverlink') serverLink: string;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private validatorArray: any[];

    constructor(private _langJson: LangJson, private _serverJson: ServerJson) {
        let self = this;
    }

    ngOnInit() {
        let self = this;
        switch (self.validationType) {
            case 'server':
                self.validatorArray = self._serverJson.getServerArray();
                break;
            default:
                self.validatorArray = self._langJson.getLangArray();
                break;
        }


    }
}