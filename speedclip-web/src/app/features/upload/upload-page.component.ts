import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiMockService} from '../../core/services/api-mock.service';

@Component({
    selector: 'sc-upload-page',
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './upload-page.component.html',
    styleUrl: './upload-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {
    loading = false;
    private fb = inject(FormBuilder);
    form = this.fb.group({
        url: ['', [Validators.pattern(/https?:\/\//i)]],
        file: [null as File | null],
        editBefore: [false],
    });
    private api = inject(ApiMockService);
    private router = inject(Router);

    submit() {
        if (this.loading) return;
        const {url, file, editBefore} = this.form.getRawValue();

        if (file instanceof File) {
            this.loading = true;
            this.api.addVideoFromFile(file.name).subscribe(v => {
                this.loading = false;
                this.navigateNext(v.id, !!editBefore);
            });
            return;
        }

        if (url) {
            this.loading = true;
            this.api.addVideoFromUrl(url).subscribe(v => {
                this.loading = false;
                this.navigateNext(v.id, !!editBefore);
            });
            return;
        }

        this.form.markAllAsTouched();
    }

    private navigateNext(videoId: string, editBefore: boolean) {
        if (editBefore) this.router.navigate(['/editor', videoId]);
        else this.router.navigate(['/']);
    }
}
