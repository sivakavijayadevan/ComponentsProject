import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <multi-lang-label [isLable]="false" [displayValue]="userTestStatus" [valueKey]="selectedlang"></multi-lang-label>
  `,
})
export class AppComponent  {
selectedlang = 'fr';
userTestStatus = {en: 'Hello', fr: 'Bonjour'};
}
