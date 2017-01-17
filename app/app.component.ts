import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hai....</h1><br/>
  <strong>{{userTestStatus | multiLangLabel:selectedlang}}</strong><br/>
  <multi-lang-label class="lblBack" [isLable]="false" [displayValue]="userTestStatus" [valueKey]="selectedlang"></multi-lang-label>`,
})
export class AppComponent  {
/**
 * App Component 
 * @class AppComponent
 * @classdesc AppComponent is the base template class
 */

/**
  * selectedlang property
  * @member {string} AppComponent#selectedlang
  */
public selectedlang: string = 'fr';

/**
  * userTestStatus property
  * @member {any} AppComponent#userTestStatus
  */
public userTestStatus: any = {en: 'Hello', fr: 'Bonjour'};

}
