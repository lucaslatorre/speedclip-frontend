import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export type Id = string;

export interface Video { id: Id; title: string; duration: number; createdAt: string; status: 'ready'|'processing'|'error'; }
export interface Cut { id: Id; videoId: Id; start: number; end: number; title: string; }
export interface Subtitle { id: Id; videoId: Id; start: number; end: number; text: string; preset: 'tiktok'|'instagram'|'minimal'; }
export interface ExportJob { id: Id; videoId: Id; format: '9:16'|'1:1'|'16:9'; resolution: '720p'|'1080p'; status: 'queued'|'processing'|'done'|'error'; }
export interface Plan { tier: 'free'|'pro'; minutesLimit: number; minutesUsed: number; }

interface MockState {
  videos: Video[];
  cuts: Cut[];
  subtitles: Subtitle[];
  exports: ExportJob[];
  plan: Plan;
}

const STORAGE_KEY = 'sc_mock_state_v1';

function uid(): Id { return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2); }
function jitter(min=200, max=600) { return Math.floor(Math.random()*(max-min+1))+min; }

@Injectable({ providedIn: 'root' })
export class ApiMockService {
  private state: MockState;

  private videos$ = new BehaviorSubject<Video[]>([]);
  private cuts$ = new BehaviorSubject<Cut[]>([]);
  private subtitles$ = new BehaviorSubject<Subtitle[]>([]);
  private exports$ = new BehaviorSubject<ExportJob[]>([]);
  private plan$ = new BehaviorSubject<Plan>({ tier: 'free', minutesLimit: 60, minutesUsed: 12 });

  constructor() {
    this.state = this.load() ?? this.seed();
    this.syncSubjects();
    this.autosave();
  }

  /* Persistence */
  private load(): MockState | null {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as MockState : null; } catch { return null; }
  }
  private save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch {}
  }
  private autosave() {
    this.videos$.subscribe(v => { this.state.videos = v; this.save(); });
    this.cuts$.subscribe(v => { this.state.cuts = v; this.save(); });
    this.subtitles$.subscribe(v => { this.state.subtitles = v; this.save(); });
    this.exports$.subscribe(v => { this.state.exports = v; this.save(); });
    this.plan$.subscribe(v => { this.state.plan = v; this.save(); });
  }

  private seed(): MockState {
    const v1: Video = { id: uid(), title: 'Podcast #12 – Highlights', duration: 1800, createdAt: new Date().toISOString(), status: 'ready' };
    const v2: Video = { id: uid(), title: 'Entrevista com Ana', duration: 2400, createdAt: new Date(Date.now()-86400000).toISOString(), status: 'ready' };
    const c1: Cut = { id: uid(), videoId: v1.id, start: 120, end: 240, title: 'Introdução forte' };
    const c2: Cut = { id: uid(), videoId: v1.id, start: 600, end: 720, title: 'Clímax' };
    const subs: Subtitle[] = [
      { id: uid(), videoId: v1.id, start: 120, end: 124, text: 'Bem-vindos ao episódio 12', preset: 'minimal' },
      { id: uid(), videoId: v1.id, start: 124, end: 129, text: 'Hoje falamos de produtividade', preset: 'minimal' },
    ];
    return { videos: [v1, v2], cuts: [c1, c2], subtitles: subs, exports: [], plan: { tier: 'free', minutesLimit: 60, minutesUsed: 12 } };
  }
  private syncSubjects() {
    this.videos$.next(this.state.videos);
    this.cuts$.next(this.state.cuts);
    this.subtitles$.next(this.state.subtitles);
    this.exports$.next(this.state.exports);
    this.plan$.next(this.state.plan);
  }

  /* Videos */
  listVideos(): Observable<Video[]> { return of(null).pipe(delay(jitter()), map(() => this.videos$.value)); }
  addVideoFromUrl(url: string): Observable<Video> {
    const v: Video = { id: uid(), title: `URL: ${url.slice(0, 24)}`, duration: 1200, createdAt: new Date().toISOString(), status: 'processing' };
    this.videos$.next([v, ...this.videos$.value]);
    // flip to ready after a moment (demo)
    setTimeout(() => { this.updateVideo(v.id, { status: 'ready' }); }, 1200);
    return of(v).pipe(delay(jitter()));
  }
  addVideoFromFile(name: string): Observable<Video> {
    const v: Video = { id: uid(), title: name, duration: 900, createdAt: new Date().toISOString(), status: 'processing' };
    this.videos$.next([v, ...this.videos$.value]);
    setTimeout(() => { this.updateVideo(v.id, { status: 'ready' }); }, 1200);
    return of(v).pipe(delay(jitter()));
  }
  updateVideo(id: Id, patch: Partial<Video>) {
    const arr = this.videos$.value.map(v => v.id === id ? { ...v, ...patch } : v);
    this.videos$.next(arr);
  }

  /* Cuts */
  listCuts(videoId: Id): Observable<Cut[]> { return of(null).pipe(delay(jitter()), map(() => this.cuts$.value.filter(c => c.videoId === videoId))); }
  createCut(videoId: Id, start: number, end: number, title = 'Novo corte'): Observable<Cut> {
    const c: Cut = { id: uid(), videoId, start, end, title };
    this.cuts$.next([c, ...this.cuts$.value]);
    return of(c).pipe(delay(jitter()));
  }
  removeCut(cutId: Id): Observable<boolean> {
    this.cuts$.next(this.cuts$.value.filter(c => c.id !== cutId));
    return of(true).pipe(delay(jitter()));
  }
  duplicateCut(cutId: Id): Observable<Cut | null> {
    const base = this.cuts$.value.find(c => c.id === cutId); if (!base) return of(null);
    const copy: Cut = { ...base, id: uid(), title: base.title + ' (copy)' };
    this.cuts$.next([copy, ...this.cuts$.value]);
    return of(copy).pipe(delay(jitter()));
  }

  /* Subtitles */
  listSubtitles(videoId: Id): Observable<Subtitle[]> { return of(null).pipe(delay(jitter()), map(() => this.subtitles$.value.filter(s => s.videoId === videoId))); }
  upsertSubtitle(s: Subtitle): Observable<Subtitle> {
    const arr = this.subtitles$.value;
    const idx = arr.findIndex(x => x.id === s.id);
    if (idx >= 0) arr[idx] = s; else arr.unshift(s);
    this.subtitles$.next([...arr]);
    return of(s).pipe(delay(jitter()));
  }
  generateSubtitles(videoId: Id): Observable<Subtitle[]> {
    const track = this.fakeWhisper(videoId);
    this.subtitles$.next([...track, ...this.subtitles$.value]);
    return of(track).pipe(delay(jitter()));
  }

  /* Exports */
  listExports(videoId: Id): Observable<ExportJob[]> { return of(null).pipe(delay(jitter()), map(() => this.exports$.value.filter(e => e.videoId === videoId))); }
  enqueueExport(videoId: Id, format: ExportJob['format'], resolution: ExportJob['resolution']): Observable<ExportJob> {
    const job: ExportJob = { id: uid(), videoId, format, resolution, status: 'queued' };
    this.exports$.next([job, ...this.exports$.value]);
    setTimeout(() => { this.updateExport(job.id, { status: 'processing' }); }, 800);
    setTimeout(() => { this.updateExport(job.id, { status: 'done' }); }, 2000);
    return of(job).pipe(delay(jitter()));
  }
  private updateExport(id: Id, patch: Partial<ExportJob>) {
    const arr = this.exports$.value.map(e => e.id === id ? { ...e, ...patch } : e);
    this.exports$.next(arr);
  }

  /* Plan */
  getPlan(): Observable<Plan> { return of(null).pipe(delay(jitter()), map(() => this.plan$.value)); }
  setPlan(tier: Plan['tier']): Observable<Plan> {
    const next: Plan = tier === 'free' ? { tier: 'free', minutesLimit: 60, minutesUsed: this.plan$.value.minutesUsed } : { tier: 'pro', minutesLimit: 600, minutesUsed: this.plan$.value.minutesUsed };
    this.plan$.next(next);
    return of(next).pipe(delay(jitter()));
  }

  /* Whisper mock */
  private fakeWhisper(videoId: Id): Subtitle[] {
    const start = Math.floor(Math.random()*60)+30;
    const parts = [
      'Olá, este é um trecho gerado pelo Whisper (mock).',
      'Estamos demonstrando legendas sequenciais.',
      'Você pode editar o texto e o tempo.',
      'Presets visuais serão aplicados na exportação.',
    ];
    return parts.map((text, i) => ({ id: uid(), videoId, start: start + i*4, end: start + i*4 + 4, text, preset: 'minimal' as const }));
  }
}

