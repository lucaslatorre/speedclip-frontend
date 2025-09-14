import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ScInputComponent} from '../../shared/components/ui/sc-input.component';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-forgot-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ScInputComponent, ScButtonComponent],
    templateUrl: './forgot-page.component.html',
    styleUrl: './forgot-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPageComponent {
    loading = false;
    sent = false;
    private fb = inject(FormBuilder);
    form = this.fb.group({email: ['', [Validators.required, Validators.email]]});

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.sent = true;
        }, 500);
    }
}

