import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { applyProps } from '../utils.js';
import '@ov/ui-components/molecules/breadcrumbs/ov-breadcrumbs';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ov-breadcrumbs',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvBreadcrumbsComponent implements OnChanges {
  @Input() items: BreadcrumbItem[] = [];
  @Input() max = 0;

  private _el = inject(ElementRef);

  ngOnChanges(): void {
    applyProps(this._el, { items: this.items });
  }
}
