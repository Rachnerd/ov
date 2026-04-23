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
import '@ov/ui-components/atoms/input/ov-input';

@Component({
  selector: 'ov-input',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvInputComponent implements OnChanges, OnInit, OnDestroy {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() autocomplete = 'off';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputEvent = new EventEmitter<{ value: string }>();
  @Output() changeEvent = new EventEmitter<{ value: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnChanges(): void {
    applyProps(this._el, { value: this.value });
  }

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ value: string }>>(this._el, 'input', (e) => {
        this.valueChange.emit(e.detail.value);
        this.inputEvent.emit(e.detail);
      }),
      listen<CustomEvent<{ value: string }>>(this._el, 'change', (e) => {
        this.changeEvent.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
