import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiMockService, Cut} from '../../core/services/api-mock.service';
import {Observable, switchMap} from 'rxjs';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-editor-page',
    standalone: true,
    imports: [CommonModule, ScButtonComponent],
    templateUrl: './editor-page.component.html',
    styleUrl: './editor-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent {
    cuts$!: Observable<Cut[]>;
    private route = inject(ActivatedRoute);
    videoId$ = this.route.paramMap.pipe(switchMap(p => [p.get('videoId')!]));
    private api = inject(ApiMockService);

    ngOnInit() {
        this.cuts$ = this.route.paramMap.pipe(switchMap(p => this.api.listCuts(p.get('videoId')!)));
    }

    duplicate(id: string) {
        this.api.duplicateCut(id).subscribe();
    }

    remove(id: string) {
        this.api.removeCut(id).subscribe();
    }

    create() {
        this.route.paramMap.subscribe(p => this.api.createCut(p.get('videoId')!, 0, 10).subscribe());
    }
}

