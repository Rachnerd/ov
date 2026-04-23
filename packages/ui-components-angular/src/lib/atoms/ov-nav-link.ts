import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/nav-link/ov-nav-link';

@Component({
  selector: 'ov-nav-link',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvNavLinkComponent {
  @Input() href = '#';
  @Input() active = false;
}
