import {Component} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ErrorMessage, TakeUntilDestroy} from '../shared/resources';
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends TakeUntilDestroy {
  public errors: Array<ErrorMessage> = []
  public username: string = ""
  public password: string = ""

  constructor(private authService: AuthService) {
    super()
  }

  public login(): void {
    this.authService.login(this.username, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log("Login successfully!"),
        error: (error) => {
          console.error(error)
          this.errors = this.authService.getErrors()
        }
      })

  }
}
