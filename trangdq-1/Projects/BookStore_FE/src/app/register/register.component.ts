import {Component} from '@angular/core';
import {EMAIL_PATTERN, ErrorMessage, NewUserDTO, PASSWORD_PATTERN, TakeUntilDestroy} from "../shared/resources";
import {Observable, takeUntil} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends TakeUntilDestroy {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>()
  public userInput: NewUserDTO = {
    username: '',
    password: '',
    email: ''
  }
  public errors: Array<ErrorMessage> = []

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    super()
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  public register() {
    if (this.validateData()) {
      this.userService.register(this.userInput)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            alert(response.message)
            this.router.navigate(['/home/1'])
          },
          error: (error) => {
            this.errors[0].message = error.message
          }
        })
    }
  }

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}, {}, {}, {}, {}, {}]
    if (this.userInput) {
      if (!this.userInput.username.trim()) {
        this.errors[0].message = "*Username is not available.";
        should = false;
      }
      if (!this.userInput.email.match(EMAIL_PATTERN)) {
        this.errors[1].message = "*Invalid email.";
        should = false;
      }
      if (this.userInput.password && !this.userInput.password.match(PASSWORD_PATTERN)) {
        this.errors[2].message = "*Invalid password.";
        should = false;
      }
    }
    return should
  }

}
