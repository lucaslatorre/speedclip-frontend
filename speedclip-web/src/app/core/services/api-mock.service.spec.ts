import {ApiMockService} from './api-mock.service';

describe('ApiMockService (cuts)', () => {
    let api: ApiMockService;

    beforeEach(() => {
        api = new ApiMockService();
    });

    it('cria, duplica e remove cortes', (done) => {
        // pega um vídeo existente do seed
        api.listVideos().subscribe(videos => {
            const videoId = videos[0].id;
            api.createCut(videoId, 1, 3).subscribe(c => {
                expect(c.videoId).toBe(videoId);
                api.duplicateCut(c.id).subscribe(copy => {
                    expect(copy && copy.id).not.toBe(c.id);
                    api.removeCut(c.id).subscribe(ok => {
                        expect(ok).toBeTrue();
                        done();
                    });
                });
            });
        });
    }, 10000);
});

