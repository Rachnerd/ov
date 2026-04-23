import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/spinner/ov-spinner';

@Component({
  selector: 'ov-spinner',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() tone: 'brand' | 'neutral' | 'inverse' = 'brand';
  @Input() label = 'Loading';
}
