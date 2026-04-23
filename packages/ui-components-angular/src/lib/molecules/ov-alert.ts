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
import '@ov/ui-components/molecules/alert/ov-alert';

@Component({
  selector: 'ov-alert',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvAlertComponent implements OnInit, OnDestroy {
  @Input() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input() title = '';
  @Input() dismissible = false;

  @Output() dismiss = new EventEmitter<void>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnInit(): void {
    this._teardowns.push(
      listen(this._el, 'dismiss', () => this.dismiss.emit()),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
