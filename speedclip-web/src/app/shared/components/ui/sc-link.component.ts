// filepath: /Users/lucaslatorre/WebstormProjects/speedclip-frontend/speedclip-web/src/app/shared/components/ui/sc-link.component.ts
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'sc-link',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sc-link.component.html',
    styleUrl: './sc-link.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLinkComponent {
    @Input() href?: string; // external
    @Input() routerLink?: any[] | string;
    @Input() target?: string;
    @Input() rel?: string = 'noopener noreferrer';
}
