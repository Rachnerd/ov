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
import '@ov/ui-components/molecules/field/ov-field';

@Component({
  selector: 'ov-field',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvFieldComponent implements OnInit, OnDestroy {
  @Input() label = '';
  @Input() for = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() status: 'idle' | 'success' | 'error' | 'warning' = 'idle';
  @Input() message = '';
  @Input() inline = false;

  @Output() fieldReset = new EventEmitter<void>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnInit(): void {
    this._teardowns.push(
      listen(this._el, 'field-reset', () => this.fieldReset.emit()),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
