import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error)=> this.errors(error)));
  }

  errors(error: HttpErrorResponse): Observable<never> {
    if(error instanceof HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
        console.log('Error del cliente');
        this.toastr.error('Error del cliente', 'Toastr fun!');
      } else {
        this.toastr.error(''+error.status, 'Toastr fun!');
        if(error.status === 401){
        this.toastr.error('No autorizado', 'Toastr fun!');
        }
        if(error.status === 200){
          this.toastr.error('No autorizado', 'Toastr fun!');
          }
      }
    }else{
      this.toastr.error('Otro tipo de error', 'Toastr fun!');

    }
    return throwError(error);
  }
}
