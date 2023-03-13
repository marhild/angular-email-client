import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Email, EmailService } from './email.service';
import { catchError} from 'rxjs/operators'
// observabe that is already marked as compplete
import { EMPTY} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(
    private emailService: EmailService,
    private router: Router
    ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY;
      })
    );
  }
}
