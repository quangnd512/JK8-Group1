import {Component} from '@angular/core';
import {
  EMAIL_PATTERN,
  ErrorMessage,
  NewUserDTO,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
  ResponseObject,
  TakeUntilDestroy,
  User,
  UserDTO
} from "../../shared/resources";
import {filter, Observable, takeUntil} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent extends TakeUntilDestroy {
  public page: number = 1
  public users: Array<User> = []
  public total_users: number = 0
  public total_pages: number = 0
  public userInput: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    name: '',
    avatar: '',
    age: 0,
    address: '',
    phone: '',
    role: 'ROLE_CUSTOMER'
  }
  public current: "dashboard" | "add" | "update" = "dashboard"
  public errors: Array<ErrorMessage> = []

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.reloadState()
    });
  }

  public ngOnInit(): void {
    this.reloadState()
  }

  public addUserPopUp(): void {
    this.userInput = {
      id: 0,
      username: '',
      password: '',
      email: '',
      name: '',
      avatar: '',
      age: 0,
      address: '',
      phone: '',
      role: 'ROLE_CUSTOMER'
    }
    this.current = "add"
  }

  public updateUserPopUp(id: number) {
    this.userService.getUserById(id).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.userInput.id = user.id
          this.userInput.username = user.username
          this.userInput.password = ''
          this.userInput.email = user.email
          this.userInput.name = user.name
          this.userInput.avatar = ''
          this.userInput.age = Number(user.age)
          this.userInput.address = user.address
          this.userInput.phone = user.phone
          this.userInput.role = user.role
          console.log("User's information gotten!")
        },
        error: (error) => alert(error.message)
      })
    this.current = "update"
  }

  public returnToDashboard(): void {
    this.current = "dashboard"
  }

  public addUser() {
    if (this.validateData()) {
      let inputDTO: NewUserDTO = {
        username: this.userInput.username,
        password: this.userInput.password,
        email: this.userInput.email
      }
      this.userService.addUser(inputDTO)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            alert(response.message)
            this.returnToDashboard()
            this.updateState()
          },
          error: (error) => {
            alert(error.message)
          }
        })
    }
  }

  public updateUser() {
    if (this.validateData()) {
      let formData = new FormData()
      let userDTO: UserDTO = {
        id: this.userInput.id,
        username: this.userInput.username,
        email: this.userInput.email,
        password: this.userInput.password,
        name: this.userInput.name,
        age: this.userInput.age,
        address: this.userInput.address,
        phone: this.userInput.phone,
        role: this.userInput.role
      }
      formData.set('info', JSON.stringify(userDTO))
      formData.set('file', JSON.stringify(''))

      this.userService.updateUser(this.userInput.id, formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            alert(response.message)
            this.returnToDashboard()
            this.updateState()
          },
          error: (error) => {
            console.log(error)
            alert(error.message)
            // this.returnToDashboard()
            // this.updateState()
          }
        })
    }
  }

  public deleteUser(id: number) {
    let choice: boolean = confirm("Delete this user?")
    if (choice) {
      this.userService.deleteUser(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            alert(response.message)
            this.updateState()
          },
          error: (error) => {
            alert(error.message)
            this.updateState()
          }
        });
    }
  }

  public updateState() {
    this.extractState(this.userService.getUsers(this.page - 1))
  }

  private reloadState() {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    this.current = "dashboard"
    this.updateState()
  }

  private extractState(users$: Observable<ResponseObject>) {
    users$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.users = <Array<User>>response.data.content
        this.total_users = <number>response.data.totalElements
        this.total_pages = <number>response.data.totalPages
      },
      error: () => {
        return null
      }
    })
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
      if (this.current === 'update') {
        if (!this.userInput.name || !this.userInput.name.trim()) {
          this.errors[3].message = "*Name is empty.";
          should = false;
        }
        if (this.userInput.age < 10) {
          this.errors[4].message = "*User is too young.";
          should = false;
        }
        if (this.userInput.age > 80) {
          this.errors[4].message = "*User is too old.";
          should = false;
        }
        if (!this.userInput.phone || !this.userInput.phone.match(PHONE_PATTERN)) {
          this.errors[5].message = "*Invalid phone number.";
          should = false;
        }
        if (!this.userInput.address || !this.userInput.address.trim()) {
          this.errors[6].message = "*Address is empty.";
          should = false;
        }
      }
    }
    return should
  }
}
