import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiMockService, ExportJob} from '../../core/services/api-mock.service';
import {Observable, switchMap} from 'rxjs';

@Component({
    selector: 'sc-preview-export-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './preview-export-page.component.html',
    styleUrl: './preview-export-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewExportPageComponent {
    jobs$!: Observable<ExportJob[]>;
    format: ExportJob['format'] = '9:16';
    resolution: ExportJob['resolution'] = '1080p';
    private route = inject(ActivatedRoute);
    private api = inject(ApiMockService);

    ngOnInit() {
        this.jobs$ = this.route.paramMap.pipe(switchMap(p => this.api.listExports(p.get('videoId')!)));
    }

    enqueue() {
        this.route.paramMap.subscribe(p => this.api.enqueueExport(p.get('videoId')!, this.format, this.resolution).subscribe());
    }
}
