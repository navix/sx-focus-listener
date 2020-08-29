import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

/**
 * Handles focus/blur for a group of elements.
 *
 * If focus moves among elements in a defined group, blur event will not be fired.
 *
 * Be aware that click on non-focusable elements will cause blur event (focus switch to `<body>`).
 */
@Injectable()
export class SxFocusListener {
  #focused = false;

  readonly #focus = new Subject<any>();

  readonly #focusWithin = new Subject<any>();

  readonly #blur = new Subject<any>();

  private elements: {
    el: HTMLElement;
    focus: Function;
    blur: Function;
  }[] = [];

  constructor(private em: EventManager) {
  }

  /**
   * Emits, if user focuses one of registered element.
   */
  get focus(): Observable<any> {
    return this.#focus.asObservable();
  }

  /**
   * Emits, if user focuses one of registered element or move focus among registered elements.
   */
  get focusWithin(): Observable<any> {
    return this.#focusWithin.asObservable();
  }

  /**
   * Emits, if focus leave one of registered element and target node is not one of registered element (or it's child).
   */
  get blur(): Observable<any> {
    return this.#blur.asObservable();
  }

  /**
   * Is one of registered element focused now.
   */
  get focused(): boolean {
    return this.#focused;
  }

  add(el: HTMLElement) {
    this.elements.push({
      el,
      focus: this.em.addEventListener(el, 'focusin', (event: any) => {
        this.#focusWithin.next(event);
        if (!this.#focused) {
          this.#focused = true;
          this.#focus.next(event);
        }
      }),
      blur: this.em.addEventListener(el, 'focusout', (event: any) => {
        this.checkLeave(event);
      }),
    });
  }

  remove(el: HTMLElement) {
    const index = this.elements.findIndex(e => e.el === el);
    if (index) {
      const element = this.elements[index];
      if (element) {
        // void handlers
        element.focus();
        element.blur();
      }
      // remove from stack
      this.elements.splice(index, 1);
    } else {
      throw new Error('Element has not been registered in KitFocusListenerService');
    }
  }

  private checkLeave(event?: any) {
    let leave = true;
    const relatedTarget = event.relatedTarget || event.explicitOriginalTarget || document.activeElement;
    this.elements.forEach(el => {
      if (el.el && el.el.contains(relatedTarget)) {
        leave = false;
      }
    });
    if (leave) {
      this.#focused = false;
      this.#blur.next(event);
    }
  }
}
