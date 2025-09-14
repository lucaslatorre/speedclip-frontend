import {ThemeService} from './theme.service';

describe('ThemeService', () => {
    let svc: ThemeService;
    const setAttrSpy = spyOn(document.documentElement, 'setAttribute').and.callThrough();

    beforeEach(() => {
        localStorage.clear();
        svc = new ThemeService();
    });

    it('aplica tema inicial respeitando prefers-color-scheme', () => {
        expect(['light', 'dark']).toContain(svc.theme);
        expect(setAttrSpy).toHaveBeenCalledWith('data-theme', svc.theme);
    });

    it('toggle alterna e persiste', () => {
        const start = svc.theme;
        svc.toggle();
        const after = svc.theme;
        expect(after).not.toBe(start);
        expect(localStorage.getItem('sc_theme')).toBe(after);
    });
});

