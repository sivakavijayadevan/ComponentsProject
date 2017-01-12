import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { AuthorJson } from '../../../shared/json/song.json/author.json';
import { Auth } from '../../../auth_module/auth/auth';

import { LangInputComponent } from '../../../shared/components/lang.input.component/lang.input.component';
import { InputLableComponent } from '../../../shared/components/inputlable.component/inputlable.component';
import { LangTextAreaComponent } from '../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../shared/components/lang.select.component/lang.select.component';

import { SongJson } from '../../../shared/json/song.json';

import * as moment from 'moment/moment';
import { DatePickerDirective } from '../../../shared/directives/date-picker';
import { TimePickerDirective } from '../../../shared/directives/time-picker';

declare var $: any;

@Component({
    selector: 'dpd-date-time',
    templateUrl: 'src/app/shared/components/datetime.component/datetime.component.html',
    styleUrls: ['src/app/shared/components/datetime.component/datetime.component.css'],
    directives: [LangInputComponent, LangTextAreaComponent, LangSelectComponent, InputLableComponent, DatePickerDirective, TimePickerDirective],
    providers: [LangJson, SongJson, AuthorJson]
})

export class DateTimeComponent implements OnInit {
    /**
     * language of the input is display.
     */
    @Input('multilingual') multilingualAttr: string;

    /**
     * model object which has to be binded in input element.
     */
    @Input('inputvalue') inputValue: any;
    @Input('inputkey') inputKey: any;

    /**
     * model object which has to be binded in input element.
     */
    @Input('displayname') displayName: any;

    @Input('keytochange') keyToChange: any;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private dates: any;
    private times: any;
    private changeDate: any;
    private loginData: any;

    constructor(private _langJson: LangJson,
        private _songJson: SongJson,
        private _authorJson: AuthorJson,
        private _auth: Auth) {
        let self = this;
        self.loginData = self._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;
        console.log(self.inputValue[self.inputKey]);
        let beforChange = moment(self.inputValue[self.inputKey]);
        self.dates = beforChange.local().format('YYYY-MM-DD');
        self.times = beforChange.local().format('HH:mm');

    }
    onKeyDown(event: any) {
        event.preventDefault();
    }

    onChangeTime(event: any) {
        console.log(event.changedDate);
        let self = this;
        var mmm = moment(self.dates + " " + event.changedDate);
        let utcDate = mmm.utc().format();
        self.dataChange.emit({
            key: self.keyToChange,
            changedDate: utcDate
        });
        self.dates = mmm.local().format('YYYY-MM-DD');
        self.times = mmm.local().format('HH:mm');
    }
    onChangeDate(event: any) {
        console.log(event.changedDate);
        let self = this;
        var mmm = moment(event.changedDate + " " + self.times);
        let utcDate = mmm.utc().format();
        self.dataChange.emit({
            key: self.keyToChange,
            changedDate: utcDate
        });
        self.dates = mmm.local().format('YYYY-MM-DD');
        self.times = mmm.local().format('HH:mm');
    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let self = this;
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);

            if (chng && chng.currentValue && typeof chng.currentValue === 'object') {
                if ("published_on" in chng.currentValue && chng.currentValue) {
                    if (self.inputValue[self.inputKey]) {
                        let beforChange = moment(self.inputValue[self.inputKey]);
                        self.dates = beforChange.local().format('YYYY-MM-DD');
                        self.times = beforChange.local().format('HH:mm');
                    }
                }

                if ("launch_date" in chng.currentValue && chng.currentValue.launch_date) {
                    if (self.inputValue[self.inputKey]) {
                        let beforChange = moment(self.inputValue[self.inputKey]);
                        self.dates = beforChange.local().format('YYYY-MM-DD');
                        self.times = beforChange.local().format('HH:mm');
                    }
                }
            }
        }
    }
}
