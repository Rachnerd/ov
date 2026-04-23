import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/link/ov-link';

@Component({
  selector: 'ov-link',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvLinkComponent {
  @Input() href = '#';
  @Input() target = '';
  @Input() rel = '';
  @Input() download = '';
  @Input() variant: 'default' | 'subtle' | 'brand' | 'inverse' = 'default';
  @Input() underline: 'hover' | 'always' | 'none' = 'hover';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
