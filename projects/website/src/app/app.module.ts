import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SxFocusListenerModule } from '../../../sx-focus-listener/src/lib/sx-focus-listener.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SxFocusListenerModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
