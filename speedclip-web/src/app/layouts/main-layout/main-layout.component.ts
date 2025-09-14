import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ThemeService} from '../../core/services/theme.service';
import {BreadcrumbService} from '../../core/services/breadcrumb.service';

@Component({
    selector: 'sc-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
    readonly collapsed = signal(false);

    constructor(public readonly theme: ThemeService, public readonly bc: BreadcrumbService) {
    }

    toggleSidebar() {
        this.collapsed.update(v => !v);
    }
}
