import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sc-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="container" aria-labelledby="nf-title">
      <h1 id="nf-title">Página não encontrada</h1>
      <p class="muted">Verifique a URL ou volte para a Dashboard.</p>
      <p><a routerLink="/">Ir para Dashboard</a></p>
    </section>
  `,
  styles: [
    `:host{display:block} .muted{color:var(--color-text-muted)} section{padding-block:var(--spacing-32)}`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}

