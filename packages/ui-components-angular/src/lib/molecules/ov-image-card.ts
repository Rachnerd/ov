import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/molecules/image-card/ov-image-card';

@Component({
  selector: 'ov-image-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvImageCardComponent {
  @Input() label = '';
  @Input() src = '';
  @Input() href = '#';
}
