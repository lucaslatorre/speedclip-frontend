import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ScButtonVariant = 'filled' | 'outline' | 'ghost';
export type ScButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'sc-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sc-button.component.html',
  styleUrls: ['./sc-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScButtonComponent {
  @Input() variant: ScButtonVariant = 'filled';
  @Input() size: ScButtonSize = 'md';
  @Input() loading = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  // Link mode
  @Input() routerLink?: any[] | string;
  @Input() href?: string;
  @Input() target?: string;
  @Input() rel: string = 'noopener noreferrer';
}
