import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/molecules/input-group/ov-input-group';

@Component({
  selector: 'ov-input-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvInputGroupComponent {
  @Input() attach: 'start' | 'end' | 'both' = 'end';
}
