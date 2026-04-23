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
import '@ov/ui-components/molecules/toast/ov-toast';

@Component({
  selector: 'ov-toast',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvToastComponent implements OnInit, OnDestroy {
  @Input() toastId = '';
  @Input() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 5000;

  @Output() dismiss = new EventEmitter<{ id: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ id: string }>>(this._el, 'dismiss', (e) => {
        this.dismiss.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
