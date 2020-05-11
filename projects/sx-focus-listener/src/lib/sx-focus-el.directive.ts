import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Optional } from '@angular/core';
import { SxFocusListener } from './sx-focus-listener';

/**
 * Register elementRef to parent `SxFocusListener`.
 */
@Directive({
  selector: '[sxFocusEl]',
})
export class SxFocusElDirective implements OnInit, OnDestroy {
  constructor(
    @Optional() private focusListener: SxFocusListener,
    private el: ElementRef,
    private platform: Platform,
  ) {
    if (!this.focusListener) {
      throw new Error(`SxFocusElDirective: should be used under SxFocusListener service, provide it in a parent component (or use [sxFocusGroup]) at any level.`);
    }
  }

  ngOnInit() {
    this.focusListener.add(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.focusListener.remove(this.el.nativeElement);
  }

  @HostListener('mousedown', ['$event']) mousedownHandler(event: any) {
    // Fix safari specific bug with blur prevention
    if (this.platform.SAFARI) {
      event.preventDefault();
    }
  }
}
