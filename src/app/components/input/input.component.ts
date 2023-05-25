import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
