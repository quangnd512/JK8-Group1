import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, takeUntil} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {TakeUntilDestroy} from "../../resources";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends TakeUntilDestroy implements OnInit {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>()
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public keyword: string = ''
  @Output()
  public searchKeywordsChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService, private authService: AuthService, private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn()
    this.isAdmin$ = this.authService.isAdmin()
  }

  public logout(): void {
    this.authService.logout().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log('Logout successfully!'),
        error: (error) => alert(error.message)
      })
  }

  public search(): void {
    this.searchService.setSearchKeyword(this.keyword);
    this.router.navigate(['/home/1'], {queryParams: {search: this.keyword}})
  }
}
