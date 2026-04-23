import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/divider/ov-divider';

@Component({
  selector: 'ov-divider',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvDividerComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() variant: 'default' | 'subtle' | 'strong' = 'default';
  @Input() spacing = '';
}
