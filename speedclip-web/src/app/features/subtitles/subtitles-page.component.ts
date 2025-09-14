import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiMockService, Subtitle} from '../../core/services/api-mock.service';
import {Observable, switchMap} from 'rxjs';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-subtitles-page',
    standalone: true,
    imports: [CommonModule, ScButtonComponent],
    templateUrl: './subtitles-page.component.html',
    styleUrl: './subtitles-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtitlesPageComponent {
    subs$!: Observable<Subtitle[]>;
    private route = inject(ActivatedRoute);
    private api = inject(ApiMockService);

    ngOnInit() {
        this.subs$ = this.route.paramMap.pipe(switchMap(p => this.api.listSubtitles(p.get('videoId')!)));
    }

    generate() {
        this.route.paramMap.subscribe(p => this.api.generateSubtitles(p.get('videoId')!).subscribe());
    }
}

