import { HttpInterceptorFn } from '@angular/common/http';

/*
  *This Inteceptor will attach a header to any outgoing request that's NOT Of type get, *head, or options. The Header is of type 'X-XSRF-TOKEN, and the value assigned to the *cookie is document.cookie := XSRF-TOKEN. This is done from spring security filter's
  *csrf configuration
*/

function getCookie(name: string): string | null {
  const entry = document.cookie.split('; ').find(c => c.startsWith(name + '='));
  return entry ? decodeURIComponent(entry.split('=').slice(1).join('=')) : null;
}

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookie('XSRF-TOKEN');
  if (token && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next(req.clone({ setHeaders: { 'X-XSRF-TOKEN': token } }));
  }
  return next(req);
};
