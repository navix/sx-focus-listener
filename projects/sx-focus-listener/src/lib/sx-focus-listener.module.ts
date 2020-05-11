import { NgModule } from '@angular/core';
import { SxFocusElDirective } from './sx-focus-el.directive';
import { SxFocusGroupDirective } from './sx-focus-group.directive';

@NgModule({
  declarations: [
    SxFocusGroupDirective,
    SxFocusElDirective,
  ],
  exports: [
    SxFocusGroupDirective,
    SxFocusElDirective,
  ],
})
export class SxFocusListenerModule {
}
