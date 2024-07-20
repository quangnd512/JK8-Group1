import {Component} from '@angular/core';
import {
  EMAIL_PATTERN,
  ErrorMessage,
  ResponseObject,
  TakeUntilDestroy,
  Voucher,
  VoucherDTO
} from "../../shared/resources";
import {filter, Observable, takeUntil} from "rxjs";
import {VoucherService} from "../../shared/services/voucher.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-voucher-manager',
  templateUrl: './voucher-manager.component.html',
  styleUrl: './voucher-manager.component.scss'
})
export class VoucherManagerComponent extends TakeUntilDestroy {
  public page: number = 1
  public vouchers: Array<Voucher> = []
  public total_vouchers: number = 0
  public total_pages: number = 0
  public current: "dashboard" | "add" | "update" = "dashboard"
  public errors: Array<ErrorMessage> = []
  public voucherInput: VoucherDTO = {
    title: '',
    rate: 0,
    userEmail: '',
    dueDate: new Date()
  }

  constructor(private voucherService: VoucherService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.reloadState()
    });
  }

  public ngOnInit(): void {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    this.current = "dashboard"
    this.updateState()
  }

  public addVoucherPopUp(): void {
    this.voucherInput = {
      title: '',
      rate: 0,
      userEmail: '',
      dueDate: new Date()
    }
    this.current = "add"
  }

  public returnToDashboard(): void {
    this.current = "dashboard"
  }

  public addVoucher(): void {
    if (this.validateData()) {
      this.voucherService.addVoucher(this.voucherInput).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            alert("Voucher saved!")
            this.returnToDashboard()
            this.updateState()
          },
          error: (error) => {
            // alert(error.response.data.message)
            alert(error.error.message)
          }
        })
    }
  }

  public deleteVoucher(id: number = 0): void {
    let choice: boolean = confirm("Delete this voucher?")
    if (choice) {
      this.voucherService.deleteVoucher(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            alert(response.message)
            this.updateState()
          },
          error: (error) => {
            alert(error.message)
          }
        });
    }
  }

  public updateState(): void {
    this.extractState(this.voucherService.getVouchers(this.page - 1))
    console.log("State updated!")
  }

  private reloadState() {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    this.current = "dashboard"
    this.updateState()
  }

  private extractState(vouchers$: Observable<ResponseObject>) {
    vouchers$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.vouchers = <Array<Voucher>>response.data.content
        this.total_pages = <number>response.data.totalPages
        this.total_vouchers = <number>response.data.totalElements
      },
      error: () => {
        return null
      }
    })
  }

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}, {}]

    if (this.voucherInput) {
      if (!this.voucherInput.title.trim()) {
        this.errors[0].message = "*Title is required. E.g. [10/10/2024] Sale off 20% all products";
        should = false;
      }
      if (!this.voucherInput.userEmail.match(EMAIL_PATTERN)) {
        this.errors[1].message = "*Invalid email.";
        should = false;
      }
      if (this.voucherInput.rate < 0) {
        this.errors[2].message = "*Rate should be at least 0%.";
        should = false;
      }
      if (Date.parse(<string><unknown>this.voucherInput.dueDate).valueOf() < Date.now()) {
        this.errors[3].message = "*Invalid due date.";
        should = false;
      }
    }
    return should
  }

}

