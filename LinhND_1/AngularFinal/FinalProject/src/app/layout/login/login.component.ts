import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from '../../shared/basedUrls';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  public $error: Array<ErrorMessage> = [{}, {}];
  // public username: string = '';
  // public password: string = '';

  public username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public password = new FormControl('', [Validators.required, Validators.minLength(3)]);



  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    if (this.username.hasError('minlength')) {
      return 'Username is not valid';
    }
    if (this.password.hasError('required')) {
      return 'Username is required';
    }
    if (this.password.hasError('minlength')) {
      return 'Username is not valid';
    }

    return '';
  }

  public login(): void {

    const username: string | null = this.username.value;
    const password: string | null = this.password.value;
    if (username && password) {
      this.authService.login(username, password);
    }

    else {
      this.$error = this.authService.getErrorMessage();
    }
  }

}
