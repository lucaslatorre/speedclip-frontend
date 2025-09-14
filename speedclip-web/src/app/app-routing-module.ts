import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {NotFoundComponent} from './shared/components/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        data: {breadcrumb: 'SpeedClip'},
        children: [
            {
                path: '',
                loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.default),
            },
            {
                path: 'upload',
                loadChildren: () => import('./features/upload/upload.routes').then(m => m.default),
            },
            {
                path: 'editor',
                loadChildren: () => import('./features/editor/editor.routes').then(m => m.default),
            },
            {
                path: 'subtitles',
                loadChildren: () => import('./features/subtitles/subtitles.routes').then(m => m.default),
            },
            {
                path: 'preview-export',
                loadChildren: () => import('./features/preview-export/preview-export.routes').then(m => m.default),
            },
            {
                path: 'billing',
                loadChildren: () => import('./features/billing/billing.routes').then(m => m.default),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.default),
    },
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
