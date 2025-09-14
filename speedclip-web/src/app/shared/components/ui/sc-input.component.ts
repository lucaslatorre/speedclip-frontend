import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'sc-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sc-input.component.html',
    styleUrl: './sc-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ScInputComponent),
        multi: true
    }]
})
export class ScInputComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() label?: string;
    @Input() placeholder?: string;
    @Input() help?: string;
    @Input() error?: string;
    @Input() type: string = 'text';
    @Input() disabled = false;
    @Input() textarea = false;

    value: string | number | null = '';

    onTouched: () => void = () => {
    };

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(val: any) {
        this.value = val;
        this.onChange(val);
    }

    private onChange: (val: any) => void = () => {
    };
}
