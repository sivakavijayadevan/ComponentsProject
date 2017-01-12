import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';
import { RadioButtonPros } from '../../models/radiobutton';

@Component({
    selector: 'dpd-radio-button',
    templateUrl: 'src/app/shared/components/radiobutton.component/radiobutton.component.html',
    styleUrls: ['src/app/shared/components/radiobutton.component/radiobutton.component.css']
})

export class RadioButtonComponent implements OnInit {
    @Input('options') radioPros: Array<RadioButtonPros> = new Array<RadioButtonPros>();
    @Input('horizontal') horizontalStatus: boolean = true;
    @Input('vertical') verticalStatus: boolean = false;
    @Output('selectChange') selectedValue = new EventEmitter();


    constructor(private _router: Router, private _auth: Auth) {
    }

    ngOnInit() {
        let self = this;
    }

    radioOnClick(value: RadioButtonPros, element: any, index: number) {
        this.selectedValue.emit({
            element: element,
            value: value,
            index: index
        });
    }

}
