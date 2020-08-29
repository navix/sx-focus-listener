import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { SxFocusListener } from './sx-focus-listener';

/**
 * Register elementRef to parent `SxFocusListener`.
 */
@Directive({
  selector: '[sxFocusEl]',
})
export class SxFocusElDirective implements OnInit, OnDestroy {
  @Input() focusListener?: SxFocusListener;

  constructor(
    @Optional() private focusListenerProvider: SxFocusListener,
    private el: ElementRef,
    private platform: Platform,
  ) {
  }

  ngOnInit() {
    this.getFocusListener().add(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.getFocusListener().remove(this.el.nativeElement);
  }

  @HostListener('mousedown', ['$event']) mousedownHandler(event: any) {
    // Fix safari specific bug with blur prevention
    if (this.platform.SAFARI) {
      event.preventDefault();
    }
  }

  private getFocusListener() {
    const focusListener = this.focusListener || this.focusListenerProvider;
    if (!focusListener) {
      throw new Error(`SxFocusElDirective: should be used under SxFocusListener service, provide it in a parent component (or use [sxFocusGroup]) at any level.`);
    }
    return focusListener;
  }
}
