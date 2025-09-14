import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, filter} from 'rxjs';

export interface Crumb {
    label: string;
    url: string;
}

type CrumbFactory = (ctx: { params: Record<string, any>; data: Record<string, any> }) => string;

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
    readonly crumbs$ = new BehaviorSubject<Crumb[]>([]);

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
            const crumbs = this.buildCrumbs(this.route.root);
            this.crumbs$.next(crumbs);
        });
        // primeira emissão
        Promise.resolve().then(() => this.crumbs$.next(this.buildCrumbs(this.route.root)));
    }

    private buildCrumbs(route: ActivatedRoute, url: string = '', acc: Crumb[] = []): Crumb[] {
        const snapshot = route.snapshot;
        const routeUrl = snapshot.url.map(s => s.path).join('/');
        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

        const data = snapshot.data as { breadcrumb?: string | CrumbFactory };
        if (data.breadcrumb) {
            let label = '' as string;
            try {
                label = typeof data.breadcrumb === 'function' ? (data.breadcrumb as CrumbFactory)({
                    params: snapshot.params,
                    data: snapshot.data
                }) : data.breadcrumb;
            } catch {
                label = '';
            }
            if (label) acc.push({label, url: nextUrl || '/'});
        }

        const children = route.children;
        if (!children || children.length === 0) return acc;
        for (const child of children) this.buildCrumbs(child, nextUrl, acc);
        return acc;
    }
}
