import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    console.log('authInterceptor');
    console.log('req', req);
    console.log('useAuth', req.headers.get('useAuth'));
    console.log('context', req.context.get(AUTH_TOKEN_ENABLED));

    let newReq = req;

    const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);

    if (APPLY_AUTH_TOKEN) {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')),
        });
    }

    return next(newReq);
}