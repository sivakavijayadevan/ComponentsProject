import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Directive({ selector: '[datePicker]' })
export class DatePickerDirective {
    /**
   * send the value to the parent component.
   */
    @Output('changedate') dataChange = new EventEmitter();
    constructor(el: ElementRef) {
        let self = this;
        $(el.nativeElement).datepicker({
            onSelect: function () {
                console.log("jq Event", $(this).val());
                self.dataChange.emit({
                    changedDate: $(this).val()
                });
            },
            dateFormat: 'yy-mm-dd'
        });
    }
}