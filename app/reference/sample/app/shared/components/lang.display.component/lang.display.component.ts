import { Component, OnInit, Input  } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
//import { LangJson } from '../../../shared/json/lang.json';

@Component({
    selector: 'dpd-lang-display',
    templateUrl: 'src/app/shared/components/lang.display.component/lang.display.component.html',
    styleUrls:['src/app/shared/components/lang.display.component/lang.display.component.css']
    //providers: [LangJson]
})

export class LangDisplayComponent implements OnInit {

    /**
    * language of the input is display.
    */
    @Input('multilingual') multilingualAttr: string;

    /**
    * display the control as a lable or content.
    */
    @Input('islable') isLable: Boolean = true;

    /**
     * model object which has to be binded in display element.
     */
    @Input('displayvalue') displayValue: any;

    /**
     * model object key this used to read the property of the model to display.
     * 
     * IMPORTANT.
     */
    @Input('valuekey') valueKey: string;
    
    //private _langJson: LangJson
    constructor() {
        
    }

    ngOnInit() {
    }
}