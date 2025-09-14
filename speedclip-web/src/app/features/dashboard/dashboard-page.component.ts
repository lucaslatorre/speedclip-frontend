import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ApiMockService, Video} from '../../core/services/api-mock.service';
import {Observable} from 'rxjs';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-dashboard-page',
    standalone: true,
    imports: [CommonModule, RouterModule, ScButtonComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
    private api = inject(ApiMockService);
    videos$: Observable<Video[]> = this.api.listVideos();
}

