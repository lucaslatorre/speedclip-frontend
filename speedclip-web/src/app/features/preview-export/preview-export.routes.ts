import {Routes} from '@angular/router';

export const PREVIEW_EXPORT_ROUTES: Routes = [
    {
        path: ':videoId',
        loadComponent: () => import('./preview-export-page.component').then(m => m.PreviewExportPageComponent),
        data: {
            breadcrumb: ({params}: {
                params: Record<string, unknown>
            }) => `Preview & Export — ${String(params['videoId'] || '').slice(0, 6)}`
        },
    },
];

export default PREVIEW_EXPORT_ROUTES;
