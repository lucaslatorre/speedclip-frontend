import { Routes } from '@angular/router';

export const SUBTITLES_ROUTES: Routes = [
  {
    path: ':videoId',
    loadComponent: () => import('./subtitles-page.component').then(m => m.SubtitlesPageComponent),
    data: { breadcrumb: ({ params }: { params: Record<string, unknown> }) => `Subtitles — ${String(params['videoId'] || '').slice(0, 6)}` },
  },
];

export default SUBTITLES_ROUTES;
