import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[timePicker]',
})
export class TimePickerDirective {
    /**
    * send the value to the parent component.
    */
    @Output('changetimes') dataChange = new EventEmitter();

    constructor(el: ElementRef) {
        let self = this;
        $(el.nativeElement).timepicker({ 'timeFormat': 'H:i', 'step': 15 });
        $(el.nativeElement).on('changeTime', function () {
            console.log("jq Event", $(this).val());
            self.dataChange.emit({
                changedDate: $(this).val()
            });
        });
    }
}