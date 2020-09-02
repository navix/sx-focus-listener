[![npm version](https://badge.fury.io/js/%40oleksa%2Fsx-focus-listener.svg)](https://www.npmjs.com/@oleksa/sx-focus-listener)

# sx-focus-listener

### 🕸 Advanced focus listener for Angular

Register element in the service and use focus/blur observables.

The service handles focus/blur for one or a group of elements.

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

### As a service

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


## License

MIT
