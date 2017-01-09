import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MultiLangLabelComponent } from './multiLangLabel/multiLangLabel.component';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MultiLangLabelComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
