import {Component} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {CustomerDTO, getRole, getUserId, PHONE_PATTERN, UserDTO} from "../../shared/resources";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public profileForm: FormGroup
  public formData: FormData
  public avatarUrl: string = ''
  public image: File | null = null
  public imagePreview: string = ''
  public loading: boolean = false

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formData = new FormData()
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      age: [0, [Validators.required, Validators.min(13), Validators.max(100)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]]
    });
  }

  public ngOnInit() {
    this.userService.getUserById(parseInt(getUserId())).subscribe({
      next: (response) => {
        let modifiedResponse = response
        modifiedResponse.password = ''
        this.profileForm?.patchValue(modifiedResponse);
        this.avatarUrl = response.avatar
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public onAvatarClick() {
    document.getElementById('avatar')?.click();
  }

  public onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formData.set('file', file);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagePreview = event.target.result
      }
      this.avatarUrl = ''
      reader.readAsDataURL(file)
    }
  }

  public onSubmit(): void {
    if (this.profileForm?.invalid) {
      return;
    }
    if (getRole() === 'ROLE_ADMIN') {
      const updatedInfo: UserDTO = {
        ...this.profileForm?.value
      };
      updatedInfo.role = 'ROLE_ADMIN'
      this.formData.set('info', JSON.stringify(updatedInfo))
      this.loading = true
      this.userService.updateUser(parseInt(getUserId()), this.formData).subscribe({
        next: () => {
          alert("Profile updated successfully!")
          this.loading = false
        },
        error: (error) => {
          console.log(error)
          this.loading = false
        }
      })
    } else if (getRole() === 'ROLE_CUSTOMER') {
      const updatedInfo: CustomerDTO = {
        ...this.profileForm?.value
      };
      this.formData.set('info', JSON.stringify(updatedInfo))
      this.loading = true
      this.userService.updateProfile(this.formData).subscribe({
        next: () => {
          alert("Profile updated successfully!")
          this.loading = false
        },
        error: (error) => {
          console.log(error)
          this.loading = false
        }
      })
    }


  }
}
