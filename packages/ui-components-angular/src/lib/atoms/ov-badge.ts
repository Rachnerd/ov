import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/badge/ov-badge';

@Component({
  selector: 'ov-badge',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvBadgeComponent {
  @Input() variant: 'default' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  @Input() appearance: 'soft' | 'solid' | 'outline' = 'soft';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() pill = true;
}
