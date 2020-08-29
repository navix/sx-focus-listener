import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  code = `<div #group="sxFocusGroup" sxFocusGroup>
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
</div>`;
}
