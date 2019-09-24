import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../account/account.service';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(this.handleError));
    }

    handleError(err: HttpErrorResponse) {
        switch (err.status) {
            case 401:
                this.accountService.logout();
                location.reload(true);
                break;
            case 400:
                Swal.fire('Client Error', err.message, 'error');
                break;
            case 500:
                Swal.fire('Server Error', err.message, 'error');
                break;
            default:
                Swal.fire('Unknown Error', 'Has appeared an unknown error on system.', 'error');
                break;
        }

        const error = err.message;
        return throwError(error);
    }
}
