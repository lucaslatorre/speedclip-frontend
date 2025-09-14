import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

export type ScButtonVariant = 'filled' | 'outline' | 'ghost';
export type ScButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'sc-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './sc-button.component.html',
    styleUrl: './sc-button.component.scss',
})
export class ScButtonComponent {
    @Input() variant: ScButtonVariant = 'filled';
    @Input() size: ScButtonSize = 'md';
    @Input() loading = false;
    @Input() disabled = false;
    // Link mode
    @Input() routerLink?: any[] | string;
    @Input() href?: string;
    @Input() target?: string;
    @Input() rel?: string = 'noopener noreferrer';

    @Output() clicked = new EventEmitter<Event>();
}
