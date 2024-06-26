import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ProgressServiceService } from '../services/progress-service.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private progressService: ProgressServiceService,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token: string = this.authService.getToken();

    if (['GET', 'PUT', 'POST', 'DELETE'].includes(request.method)) {
      this.progressService.startLoading();
    }

    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + token
        ),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set(
          'Content-Type',
          'application/json'
        ),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        if ([403, 401].includes(error.status)) {
          setTimeout(() => {
            Swal.fire({
              title: 'Ooops',
              text: error.error.errors[0],
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#34c38f',
              cancelButtonColor: '#f46a6a',
              confirmButtonText: 'Login Ulang',
            }).then((result) => {
              if (result.value) {
                token = '';
                this.authService.logout();
                this.router.navigate(['/auth/login']).then(() => {
                  window.location.reload();
                });
              }
            });
            return throwError(error);
          }, 3000);

        }

        return throwError(error);
      }),
      finalize(() => this.progressService.finishLoading())
    );
  }
}
