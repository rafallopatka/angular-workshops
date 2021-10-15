import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './containers/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIALS } from './components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MATERIALS,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
