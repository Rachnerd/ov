import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/molecules/stat/ov-stat';

@Component({
  selector: 'ov-stat',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvStatComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() sublabel = '';
  @Input() delta = '';
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';
}
