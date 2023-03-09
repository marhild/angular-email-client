import { Injectable } from '@angular/core'
import { AsyncValidator, FormControl } from '@angular/forms'
import { map, catchError } from 'rxjs/operators'
import { AbstractControl} from '@angular/forms'
import { AuthService } from '../auth.service'
import { of } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate = (control: AbstractControl) => {
        const {value} = control;

        return this.authService.usernameAvailable(value).pipe(
          map(value => {
            if(value.available) {
              return null;
            } else {
              return of({nonUniqueUsername: true})
            }
          }),
          catchError((err) => {
            if(err.error.username) {
              return of({nonUniqueUsername: true})
            } else {
              return of({noConnection: true})
            }
          })
        )
    }
}
