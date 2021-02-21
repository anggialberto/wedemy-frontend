import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  Observable
} from "rxjs";
import {
  tap
} from 'rxjs/operators'
import {
  AuthService
} from "@bootcamp-homepage/services/auth.service";
import {
  ToastService
} from "@bootcamp-homepage/services/toast.service";
@Injectable()
export class HttpIntercept implements HttpInterceptor {

  constructor(private toast: ToastService, private auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getToken();

    let reqNew = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next.handle(reqNew).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('request succeeded');
            if (event.body.ok == true && event.body.message) {
              if (event.body.message != 'Data berhasil diambil') {
                this.toast.successToast(event.body.message)
              }
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log('request failed');
            if (error.error != null) {
              if (error.error.message) {
                this.toast.errorToast(error.error.message)
              } else {
                this.toast.errorToast(error.error)
              }
            }
          }
        },
        () => {
          console.log('complete');
        }
      )
    )
  }

}
