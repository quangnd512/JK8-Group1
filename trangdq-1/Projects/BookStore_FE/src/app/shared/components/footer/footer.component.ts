import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public isAdmin$: Observable<boolean> = new Observable<boolean>()

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
  }
}
