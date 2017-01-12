import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Auth } from '../../../auth_module/auth/auth';
import * as moment from 'moment/moment';

@Component({
    selector: 'dpd-duration',
    templateUrl: 'src/app/shared/components/duration.component/duration.component.html',
    styleUrls: ['src/app/shared/components/duration.component/duration.component.css'],
})

export class DurationComponent implements OnInit {

    @Input('inputvalue') inputValue: any;
    @Input('inputkey') inputKey: any;
    /**
    * lable value.
    */
    @Input('displayname') displayName: string;
    /**
   * lable visiblity.
   */
    @Input('lablevisiblity') lableVisible: Boolean = true;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private outputValue: string;
    private hoursValue: number;
    private minutesValue: number;
    private secondsValue: number;
    private loginData: any;

    constructor(private _auth: Auth) {
        let self = this;
        self.loginData = self._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;
        let times = self.inputValue[this.inputKey].split(":");
        if (times && times.length > 0 && times[0]) {
            this.display(times[0]);
            if (times.length > 1) {
                this.secondsValue = times[1];
            }
        }
    }

    convertValue(event: any, type: string, hour: string, minutes: string, seconds: string) {
        if (!hour)
            hour = "0";

        if (!minutes)
            minutes = "0";

        if (!seconds)
            seconds = "0";

        let totalHours = parseInt(hour) * 60;
        if (minutes) {
            totalHours = totalHours + parseInt(minutes);
        }

        let totalString = totalHours.toString();
        if (totalString.length == 1) {
            totalString = "0" + totalString;
        }

        if (parseInt(seconds) > 60) {
            var removeChr = 1;
            if (seconds.length > 2)
                removeChr = 2;
            seconds = seconds.substr(0, removeChr);
        }
        if (seconds.length == 1) {
            seconds = "0" + seconds;
        }
        if (totalString == "NaN") {
            totalString = "00";
        }
        this.outputValue = (totalString ? totalString : "00") + ":" + (seconds ? seconds : "00");
        this.dataChange.emit({ value: this.outputValue });
    }

    display(minutes: number) {
        var hours = Math.trunc(minutes / 60);
        var minutes = minutes % 60;
        console.log(hours + ":" + minutes);

        this.hoursValue = hours;
        this.minutesValue = minutes;
    }

    onKeyDown(event: any) {
        console.log(event);
        if (event.keyCode == 8)
            return;
        console.log(event.target.value);
        if (parseInt(event.target.value) > 60) {
            event.preventDefault();
        }
    }

    onKeyUp(event: any) {
        console.log(event);
        if (event.keyCode == 8)
            return;
        console.log(event.target.value);
        if (parseInt(event.target.value) > 60) {
            var removeChr = 1;
            if (event.target.value.length > 2)
                removeChr = 2;
            this.secondsValue = event.target.value.substr(0, removeChr);
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let self = this;
        for (let propName in changes) {
            let chng = changes[propName];
            if (chng && chng.currentValue && typeof chng.currentValue === 'object') {
                if ("duration" in chng.currentValue && chng.currentValue) {
                    if (self.inputValue[self.inputKey]) {
                        let times = self.inputValue[this.inputKey].split(":");
                        this.display(times[0]);

                        if (times.length > 1) {
                            this.secondsValue = times[1];
                        }
                    }
                }
            }
        }
    }

}