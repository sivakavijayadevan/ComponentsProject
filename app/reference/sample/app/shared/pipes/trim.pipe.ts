import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'multiLangLabel'})

export class MultiLangLabelPipe implements PipeTransform {
    transform(value: any, keyValue: string): any {
        return value[keyValue];       
    }
}