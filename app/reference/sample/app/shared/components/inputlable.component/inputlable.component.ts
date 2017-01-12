import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';

@Component({
    selector: 'dpd-lang-input-lable',
    templateUrl: 'src/app/shared/components/inputlable.component/inputlable.component.html',
    styleUrls: ['src/app/shared/components/inputlable.component/inputlable.component.css'],
    providers: [LangJson]
})

export class InputLableComponent implements OnInit {
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
     * input lable contol property like visiblity, displaytext. 
     */
    @Input('lablevalue') lableValue: any;

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
    
 
    @Input('componentkey') componentKey: string;

    constructor(private _langJson: LangJson) {
    }

    ngOnInit() {
        let self = this;
        console.log(self.inputValue);

        if (self.inputValue && self.inputValue.length) {
            self.inputValue.forEach(function (params: any) {
            });
        }
    }

    addInput(event: any, index: number) {
        let self = this;
        self.inputValue.push(self._langJson.getLangJson());

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
        //this.inpuLang.splice(index, 1);
    }
}
