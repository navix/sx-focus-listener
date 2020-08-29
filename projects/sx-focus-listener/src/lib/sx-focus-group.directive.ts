import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { SxFocusListener } from './sx-focus-listener';

/**
 * Creates `SxFocusListener` service, but not registers the element itself to the service (use `[sxFocusEl]` for that purpose).
 */
@Directive({
  selector: '[sxFocusGroup]',
  providers: [
    SxFocusListener,
  ],
  exportAs: 'sxFocusGroup'
})
export class SxFocusGroupDirective implements OnInit {
  @Output() groupFocus = new EventEmitter();

  @Output() groupFocusWithin = new EventEmitter();

  @Output() groupBlur = new EventEmitter();

  constructor(
    public focusListener: SxFocusListener,
  ) {
  }

  ngOnInit() {
    this.groupFocus.subscribe(this.focusListener.focus);
    this.groupFocusWithin.subscribe(this.focusListener.focusWithin);
    this.groupBlur.subscribe(this.focusListener.blur);
  }
}
