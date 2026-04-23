import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/molecules/empty-state/ov-empty-state';

@Component({
  selector: 'ov-empty-state',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvEmptyStateComponent {
  @Input() heading = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
