# Focus listener service for Angular

Handles focus/blur from a group of elements.

If focus moves among elements in a defined group, blur event will not be fired.

Be aware, click on non-focusable elements will cause blur event (focus switch to `<body>`).


## Installation

```
$ npm i @oleksa/sx-focus-listener
```


## Usage

### In templates

```html
<div #group="sxFocusGroup" sxFocusGroup>
  <h4>Group focused: {{ group.focusListener.focused | json }}</h4>
  <button sxFocusEl>In group!</button>
  <button sxFocusEl>In group!</button>
  <button sxFocusEl>In group!</button>
  <button>Out of group</button>
</div>
<div>
  <h4>Manual registration in group.</h4>
  <button [focusListener]="group.focusListener" sxFocusEl>Button in group!</button>
  <button>Out of group</button>
</div>
```

### As service

```typescript
...
@Component({
  ...
  providers: [SxFocusListener],
})
export class MyComponent {
  constructor(
    private focusListener: SxFocusListener,
    ...
  ) {
  }
  
  ...

  this.focusListener.add(nativeElement1);
  this.focusListener.add(nativeElement2);
  this.focusListener.add(nativeElement3);
  this.focusListener.focus.subscribe((event: any) => {});
  this.focusListener.blur.subscribe((event: any) => {});
```
