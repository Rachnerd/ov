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
import '@ov/ui-components/atoms/checkbox/ov-checkbox';

@Component({
  selector: 'ov-checkbox',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvCheckboxComponent implements OnChanges, OnInit, OnDestroy {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() name = '';
  @Input() value = 'on';

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() changeEvent = new EventEmitter<{ checked: boolean; value: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnChanges(): void {
    applyProps(this._el, { checked: this.checked, indeterminate: this.indeterminate });
  }

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ checked: boolean; value: string }>>(this._el, 'change', (e) => {
        this.checkedChange.emit(e.detail.checked);
        this.changeEvent.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
