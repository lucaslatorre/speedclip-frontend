import {Routes} from '@angular/router';

export const BILLING_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./billing-page.component').then(m => m.BillingPageComponent),
        data: {breadcrumb: 'Billing'},
    },
];

export default BILLING_ROUTES;
