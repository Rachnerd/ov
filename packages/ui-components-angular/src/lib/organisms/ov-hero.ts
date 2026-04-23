import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/organisms/hero/ov-hero';

@Component({
  selector: 'ov-hero',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvHeroComponent {
  @Input() heading = '';
  @Input() subheading = '';
  @Input() src = '';
  @Input() overlay = 0.55;
}
