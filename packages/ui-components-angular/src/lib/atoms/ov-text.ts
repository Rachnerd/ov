import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { applyProps } from '../utils.js';
import '@ov/ui-components/atoms/text/ov-text';

@Component({
  selector: 'ov-text',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvTextComponent implements OnChanges {
  @Input() variant: 'body' | 'body-sm' | 'lead' | 'caption' | 'eyebrow' | 'code' = 'body';
  @Input() tone: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse' = 'primary';
  @Input() weight: '' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' = '';
  @Input() as: 'span' | 'p' | 'div' | 'small' | 'strong' | 'em' = 'span';

  private _el = inject(ElementRef);

  ngOnChanges(): void {
    applyProps(this._el, { as: this.as });
  }
}
