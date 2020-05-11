import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { SxFocusListener } from './sx-focus-listener';

/**
 * Register `SxFocusListener` on element, but not the element itself (use `[sxFocusEl]` for that purpose).
 */
@Directive({
  selector: '[sxFocusGroup]',
  providers: [
    SxFocusListener,
  ],
})
export class SxFocusGroupDirective implements OnInit {
  @Output() groupFocus = new EventEmitter();

  @Output() groupFocusWithin = new EventEmitter();

  @Output() groupBlur = new EventEmitter();

  constructor(
    private focusListener: SxFocusListener,
  ) {
  }

  ngOnInit() {
    this.groupFocus.subscribe(this.focusListener.focus);
    this.groupFocusWithin.subscribe(this.focusListener.focusWithin);
    this.groupBlur.subscribe(this.focusListener.blur);
  }
}
