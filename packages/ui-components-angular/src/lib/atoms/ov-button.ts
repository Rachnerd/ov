import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/button/ov-button';

@Component({
  selector: 'ov-button',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'accent' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() block = false;
}
