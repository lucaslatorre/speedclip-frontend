// filepath: /Users/lucaslatorre/WebstormProjects/speedclip-frontend/speedclip-web/src/app/shared/components/ui/sc-status-bar.component.ts
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export type ScStatusKind = 'success' | 'warn' | 'error' | 'info';

@Component({
    selector: 'sc-status-bar',
    standalone: true,
    templateUrl: './sc-status-bar.component.html',
    styleUrl: './sc-status-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStatusBarComponent {
    @Input() kind: ScStatusKind = 'info';
    @Input() message = '';

    get role() {
        return this.kind === 'error' ? 'alert' : 'status';
    }
}

