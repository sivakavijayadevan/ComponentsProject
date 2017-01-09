import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MultiLangLabelComponentModule} from './@MultilingualComponent/index';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, MultiLangLabelComponentModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
