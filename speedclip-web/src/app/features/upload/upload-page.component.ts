import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiMockService} from '../../core/services/api-mock.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'sc-upload-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {
  // estado para feedback ao usuário
  status: { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string } = { kind: 'idle' };
  loading = false;

  // injeções via inject()
  private fb = inject(FormBuilder);
  private api = inject(ApiMockService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Regex robusta para identificar o ID do YouTube (11 chars)
  private static readonly YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;

  // formulário reativo
  form = this.fb.group({
    url: [''],
    file: [null as File | null],
    editBefore: [false],
  });

  // verifica se a string é uma URL YouTube válida (pública para template)
  isUrlValid(value?: string | null): boolean {
    if (!value) return false;
    return !!UploadPageComponent.YT_REGEX.exec(value.trim());
  }

  // getter usado no template para habilitar/desabilitar o botão
  get canSubmit(): boolean {
    if (this.loading) return false;
    const { url, file } = this.form.getRawValue();
    if (url) return this.isUrlValid(url);
    return file instanceof File;
  }

  // extrai o videoId quando possível
  private extractVideoId(url?: string | null): string | null {
    if (!url) return null;
    const m = UploadPageComponent.YT_REGEX.exec(url.trim());
    return m && m[1] ? m[1] : null;
  }

  // thumbnail público do YouTube sem usar API
  get thumbnailUrl(): string | null {
    const id = this.extractVideoId(this.form.controls.url.value);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  // handler para input file (usado no template)
  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    this.form.patchValue({ file });
    if (file) this.form.controls.url.setValue(''); // limpar URL se enviar arquivo
    this.cdr.markForCheck();
  }

  // método exposto para os testes: envia URL ou arquivo
  submitUrl() {
    if (this.loading) return;

    const { url, file, editBefore } = this.form.getRawValue();

    // Se houver URL, validar antes
    if (url) {
      if (!this.isUrlValid(url)) {
        this.status = { kind: 'error', message: 'Por favor, insira uma URL do YouTube válida.' };
        this.cdr.markForCheck();
        return;
      }

      this.loading = true;
      this.status = { kind: 'loading', message: 'Processando URL...' };
      this.cdr.markForCheck();

      const resp: any = this.api.addVideoFromUrl(url);
      if (resp && typeof resp.pipe === 'function') {
        resp.pipe(take(1)).subscribe((v: any) => {
          this.loading = false;
          this.status = { kind: 'success', message: 'URL processada com sucesso.' };
          this.cdr.markForCheck();
          this.navigateNext(v.id, !!editBefore);
        }, () => {
          this.loading = false;
          this.status = { kind: 'error', message: 'Erro ao processar a URL.' };
          this.cdr.markForCheck();
        });
      } else if (resp && typeof resp.subscribe === 'function') {
        // compatibilidade com stubs que retornam objeto com subscribe
        resp.subscribe((v: any) => {
          this.loading = false;
          this.status = { kind: 'success', message: 'URL processada com sucesso.' };
          this.cdr.markForCheck();
          this.navigateNext(v.id, !!editBefore);
        }, () => {
          this.loading = false;
          this.status = { kind: 'error', message: 'Erro ao processar a URL.' };
          this.cdr.markForCheck();
        });
      } else {
        this.loading = false;
        this.status = { kind: 'error', message: 'Resposta inesperada do serviço.' };
        this.cdr.markForCheck();
      }

      return;
    }

    // Se houver arquivo local
    if (file instanceof File) {
      this.loading = true;
      this.status = { kind: 'loading', message: 'Enviando arquivo...' };
      this.cdr.markForCheck();

      const resp: any = this.api.addVideoFromFile(file);
      if (resp && typeof resp.pipe === 'function') {
        resp.pipe(take(1)).subscribe((v: any) => {
          this.loading = false;
          this.status = { kind: 'success', message: 'Arquivo enviado com sucesso.' };
          this.cdr.markForCheck();
          this.navigateNext(v.id, !!editBefore);
        }, () => {
          this.loading = false;
          this.status = { kind: 'error', message: 'Erro ao enviar arquivo.' };
          this.cdr.markForCheck();
        });
      } else if (resp && typeof resp.subscribe === 'function') {
        resp.subscribe((v: any) => {
          this.loading = false;
          this.status = { kind: 'success', message: 'Arquivo enviado com sucesso.' };
          this.cdr.markForCheck();
          this.navigateNext(v.id, !!editBefore);
        }, () => {
          this.loading = false;
          this.status = { kind: 'error', message: 'Erro ao enviar arquivo.' };
          this.cdr.markForCheck();
        });
      } else {
        this.loading = false;
        this.status = { kind: 'error', message: 'Resposta inesperada do serviço.' };
        this.cdr.markForCheck();
      }

      return;
    }

    // nenhum input válido
    this.form.markAllAsTouched();
    this.status = { kind: 'error', message: 'Insira uma URL do YouTube válida ou envie um arquivo.' };
    this.cdr.markForCheck();
  }

  private navigateNext(videoId: string, editBefore: boolean) {
    if (editBefore) this.router.navigate(['/editor', videoId]);
    else this.router.navigate(['/']);
  }
}
