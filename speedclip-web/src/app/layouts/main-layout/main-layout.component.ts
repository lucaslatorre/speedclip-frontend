import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ThemeService} from '../../core/services/theme.service';
import {BreadcrumbService} from '../../core/services/breadcrumb.service';
// lucide-angular
import {LucideAngularModule, LUCIDE_ICONS, LucideIconProvider} from 'lucide-angular';
import {Menu, LayoutDashboard, Upload, Mail, Calculator, Phone, Tags, Cog, Link, FileText, Search, Sun, Moon} from 'lucide-angular';

@Component({
  selector: 'sc-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({Menu, LayoutDashboard, Upload, Mail, Calculator, Phone, Tags, Cog, Link, FileText, Search, Sun, Moon})}
  ]
})
export class MainLayoutComponent {
  collapsed = signal(false);
  // serviços públicos para template
  readonly theme = inject(ThemeService);
  readonly bc = inject(BreadcrumbService);

  toggleSidebar() {
    this.collapsed.update(v => !v);
  }
}
