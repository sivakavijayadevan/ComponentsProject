import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MultiLanguageComponentModule} from './@MultilingualComponent/index';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, MultiLanguageComponentModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
