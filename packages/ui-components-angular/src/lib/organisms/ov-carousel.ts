import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import '@ov/ui-components/organisms/carousel/ov-carousel';

@Component({
  selector: 'ov-carousel',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvCarouselComponent {
  @Input() heading = '';
  @Input() visibleCount = 3;
  @Input() countMd = 2;
  @Input() countSm = 1;
  @Input() autoPlayMs = 4000;
}
