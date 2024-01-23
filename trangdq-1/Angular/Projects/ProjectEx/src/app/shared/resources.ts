import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

export const SERVER_URL = "http://localhost:8080"

export const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
};

export type ErrorMessage = {
  message?: string;
}

export type Product = {
  id: number,
  name: string,
  price: number,
  description: string,
  inStock: number,
  images: Array<string>,
  category: string,
  discount: number
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

export type ProductDTO = {
  name: string,
  price: number,
  description: string,
  inStock: number,
  images: Array<string>,
  category: string,
  discount: number
}

export type Response = {
  message: string,
  status: number
}

export type ResponseObject = {
  data: {
    content?: Array<Product> | Product | Array<User> | User
    totalElements?: number,
    first?: boolean,
    last?: boolean,
    pageable?: {
      pageNumber?: number,
      pageSize?: number
    }
  }
}

export const PASSWORD_PATTERN = /^[A-Z][a-zA-Z0-9]{7}$/;

export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

export const PHONE_PATTERN = /^[0-9]{10}$/;

@Injectable()
export abstract class TakeUntilDestroy implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



