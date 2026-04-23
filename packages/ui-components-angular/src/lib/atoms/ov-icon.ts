import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/icon/ov-icon';

@Component({
  selector: 'ov-icon',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvIconComponent {
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() label = '';
}
