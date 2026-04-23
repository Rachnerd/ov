import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { listen } from '../utils.js';
import '@ov/ui-components/molecules/menu-item/ov-menu-item';

@Component({
  selector: 'ov-menu-item',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvMenuItemComponent implements OnInit, OnDestroy {
  @Input() label = '';
  @Input() description = '';
  @Input() disabled = false;
  @Input() selected = false;
  @Input() separator = false;

  @Output() select = new EventEmitter<{ label: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ label: string }>>(this._el, 'select', (e) => {
        this.select.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
