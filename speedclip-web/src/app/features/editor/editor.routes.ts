import {Routes} from '@angular/router';

export const EDITOR_ROUTES: Routes = [
    {
        path: ':videoId',
        loadComponent: () => import('./editor-page.component').then(m => m.EditorPageComponent),
        data: {
            breadcrumb: ({params}: {
                params: Record<string, unknown>
            }) => `Editor — ${String(params['videoId'] || '').slice(0, 6)}`
        },
    },
];

export default EDITOR_ROUTES;
