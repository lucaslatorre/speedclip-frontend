import {Routes} from '@angular/router';

export const UPLOAD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./upload-page.component').then(m => m.UploadPageComponent),
        data: {breadcrumb: 'Upload'}
    }
];

export default UPLOAD_ROUTES;
