import { Component, OnInit, Input } from '@angular/core';
import { CORE_DIRECTIVES, NgIf,NgFor } from '@angular/common';
import { Error } from '../../models/error';

@Component({
    selector: 'dpd-error-box',
    templateUrl: 'src/app/shared/components/error.component/error.component.html',
    styleUrls: ['src/app/shared/components/error.component/error.component.css']
})

export class ErrorComponent implements OnInit {
    @Input('error') error: Error;

    constructor() { }

    ngOnInit() {
        let self = this;
        self.error = new Error();
    }
    clearError(){
        let self = this;
        self.error = new Error();
    }
}