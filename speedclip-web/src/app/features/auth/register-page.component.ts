import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ScInputComponent} from '../../shared/components/ui/sc-input.component';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-register-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ScInputComponent, ScButtonComponent],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
    loading = false;
    private fb = inject(FormBuilder);
    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    private router = inject(Router);

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/']);
        }, 500);
    }
}

