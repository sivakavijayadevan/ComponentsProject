import { Pipe } from '@angular/core';

@Pipe({
    name: 'nan',
    pure: true
})

export class NAN {
    transform(value: any, args: any[] = null): any {
        if (isNaN(value))
            return 0;
        else
            return value;

    }
}