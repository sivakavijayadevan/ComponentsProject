import {Injectable} from '@angular/core';

@Injectable()
export class DelayService {
    public Delay(timeout: any, onDone: any, index: any) {
        setTimeout(function () {
            onDone(index);
        }, timeout);
    }
}