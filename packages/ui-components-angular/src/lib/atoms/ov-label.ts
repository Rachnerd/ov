import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/label/ov-label';

@Component({
  selector: 'ov-label',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvLabelComponent {
  @Input() for = '';
  @Input() required = false;
  @Input() size: 'sm' | 'md' = 'md';
}
