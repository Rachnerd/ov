import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { applyProps } from '../utils.js';
import '@ov/ui-components/organisms/nav-bar/ov-nav-bar';

export interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'ov-nav-bar',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvNavBarComponent implements OnChanges {
  @Input() brand = '';
  @Input() tagline = '';
  @Input() logoHref = '/';
  @Input() items: NavItem[] = [];
  @Input() active = '';

  private _el = inject(ElementRef);

  ngOnChanges(): void {
    applyProps(this._el, { items: this.items });
  }
}
