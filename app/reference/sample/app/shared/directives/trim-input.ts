import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[trimText]',
})

export class TrimTextDirective {
    /**
    * send the value to the parent component.
    */
    @Output('changetimes') dataChange = new EventEmitter();

    constructor(el: ElementRef) {
        let self = this;
        $(el.nativeElement).blur(function () {
            
        });
    }
}