import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

export function loadingInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
        const loadingService = inject(LoadingService);
        loadingService.showLoading();
        return next(req).pipe(
            finalize(() => loadingService.hideLoading())
        );
    }