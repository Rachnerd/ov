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
import '@ov/ui-components/molecules/tabs/ov-tabs';

export interface TabItem {
  key: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

@Component({
  selector: 'ov-tabs',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvTabsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() tabs: TabItem[] = [];
  @Input() active = '';
  @Input() appearance: 'underline' | 'pills' = 'underline';
  @Input() fill = false;

  @Output() activeChange = new EventEmitter<string>();
  @Output() changeEvent = new EventEmitter<{ key: string }>();

  private _el = inject(ElementRef);
  private _teardowns: Array<() => void> = [];

  ngOnChanges(): void {
    applyProps(this._el, { tabs: this.tabs });
  }

  ngOnInit(): void {
    this._teardowns.push(
      listen<CustomEvent<{ key: string }>>(this._el, 'change', (e) => {
        this.activeChange.emit(e.detail.key);
        this.changeEvent.emit(e.detail);
      }),
    );
  }

  ngOnDestroy(): void {
    this._teardowns.forEach((fn) => fn());
  }
}
