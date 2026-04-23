import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/templates/page-layout/ov-page-layout';

@Component({
  selector: 'ov-page-layout',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvPageLayoutComponent {
  @Input() maxWidth = '';
}
