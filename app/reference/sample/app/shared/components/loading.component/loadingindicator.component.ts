import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';


@Component({
    selector: 'loading-indicator',
    directives: [CORE_DIRECTIVES, NgIf],
    templateUrl: 'src/app/shared/components/loading.component/loadingindicator.component.html',
    styleUrls: ['src/app/shared/components/loading.component/loadingindicator.component.css'],
})

export class LoadingIndicatorComponent implements OnInit, OnDestroy {
    @Input('isLoading') isLoading: boolean = false;

    constructor() { }
    ngOnInit() { }
    ngOnDestroy() { }
}