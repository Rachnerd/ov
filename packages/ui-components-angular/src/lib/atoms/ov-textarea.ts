import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { applyProps, listen } from '../utils.js';
import '@ov/ui-components/atoms/textarea/ov-textarea';

@Component({
  selector: 'ov-textarea',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvTextareaComponent implements OnChanges, OnInit, OnDestroy {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() rows = 4;
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputEvent = new EventEmitter<{ value: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnChanges(): void {
    applyProps(this._el, { value: this.value, rows: this.rows });
  }

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ value: string }>>(this._el, 'input', (e) => {
        this.valueChange.emit(e.detail.value);
        this.inputEvent.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
