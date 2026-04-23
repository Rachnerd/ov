import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { applyProps } from '../utils.js';
import '@ov/ui-components/atoms/heading/ov-heading';

@Component({
  selector: 'ov-heading',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvHeadingComponent implements OnChanges {
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Input() size: '' | 'display-1' | 'display-2' | 'h1' | 'h2' | 'h3' | 'h4' | 'hero' = '';
  @Input() tone: 'primary' | 'secondary' | 'brand' | 'accent' | 'inverse' = 'primary';

  private _el = inject(ElementRef);

  ngOnChanges(): void {
    applyProps(this._el, { level: this.level });
  }
}
