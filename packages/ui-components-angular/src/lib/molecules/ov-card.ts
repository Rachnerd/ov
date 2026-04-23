import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/molecules/card/ov-card';

@Component({
  selector: 'ov-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvCardComponent {
  @Input() variant: 'default' | 'brand' | 'inverse' | 'inverse-brand' = 'default';
  @Input() interactive = false;
  @Input() borderless = false;
  @Input() flush = false;
}
