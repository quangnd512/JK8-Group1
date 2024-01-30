import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

export const SERVER_URL = "http://localhost:8080"

export const PASSWORD_PATTERN = /^[A-Z][a-zA-Z0-9]{7}$/;

export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

export const PHONE_PATTERN = /^[0-9]{10}$/;

export const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('token')
};

export type ErrorMessage = {
  message?: string;
}

export type Product = {
  id?: number,
  name: string,
  price: number,
  description: string,
  inStock: number,
  images: Array<string>,
  category: string,
  discount: number
}

export type CartItem = {
  quantity: number,
  productId: number,
  name: string;
  price: number;
  description: string;
  inStock: number
  images: Array<string>
  category: string,
  discount: number
}

export type Item = {
  productId: number,
  quantity: number
}
export type Order = {
  id: number;
  items: string;
  customerId: number;
  voucherId: number;
  checkoutDate: Date;
  orderStatus: string;
  paymentMethod: string;
  messageOfCustomer: string;
  addressToReceive: string;
  customerInfo: string;
  // voucher: VoucherEntity;
}

export type OrderDTO = {
  customerPhone: string;
  voucherChosen: number;
  paymentMethod: "Cash" | "Paypal";
  messageOfCustomer: string;
  cartItems: Array<Item>;
  addressToReceive: string;
  customerName: string
}

export type User = {
  id: number,
  username: string,
  password: string,
  email: string,
  name: string,
  avatar: string,
  age: number,
  address: string,
  phone: string,
  role: 'ROLE_ADMIN' | 'ROLE_CUSTOMER'
}

export type NewUserDTO = {
  username: string,
  password: string,
  email: string,
}

export type Response = {
  message: string,
  status: number,
  data?: any
}

export type ResponseObject = {
  data: {
    content?: Array<Product> | Product | Array<User> | User
    totalElements?: number,
    totalPages?: number,
  }
}

export enum OrderStatus {
  SUCCESS = "SUCCESS",
  SHIPPING = "SHIPPING",
  ADMIN_PREPARING = "ADMIN_PREPARING",
  CUSTOMER_CONFIRMED = "CUSTOMER_CONFIRMED",
  CUSTOMER_CANCELED = "CUSTOMER_CANCELED",
  CUSTOMER_REQUEST_CANCEL = "CUSTOMER_REQUEST_CANCEL",
}

@Injectable()
export abstract class TakeUntilDestroy implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



