import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/atoms/avatar/ov-avatar';

@Component({
  selector: 'ov-avatar',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvAvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() name = '';
  @Input() initials = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() tone: 'brand' | 'accent' | 'neutral' = 'brand';
}
