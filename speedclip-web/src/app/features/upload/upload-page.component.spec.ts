import {TestBed} from '@angular/core/testing';
import {UploadPageComponent} from './upload-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiMockService} from '../../core/services/api-mock.service';

class RouterStub {
    navigate = jasmine.createSpy('navigate');
}

class ApiMockStub {
    addVideoFromUrl = () => ({subscribe: (fn: any) => fn({id: 'vid1'})});
}

describe('UploadPageComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, UploadPageComponent],
            providers: [
                {provide: Router, useClass: RouterStub},
                {provide: ApiMockService, useClass: ApiMockStub},
            ]
        });
    });

    it('valida URL e mostra erro quando inválida', () => {
        const fixture = TestBed.createComponent(UploadPageComponent);
        const comp = fixture.componentInstance;
        comp.form.controls.url.setValue('xxx');
        comp.submitUrl();
        expect(comp.status?.kind).toBe('error');
    });

    it('submete URL válida e navega', () => {
        const fixture = TestBed.createComponent(UploadPageComponent);
        const comp = fixture.componentInstance;
        const router = TestBed.inject(Router) as any as RouterStub;

        comp.form.controls.url.setValue('https://youtu.be/abc');
        comp.form.controls.editBefore.setValue(true);
        comp.submitUrl();

        expect(router.navigate).toHaveBeenCalled();
    });
});

