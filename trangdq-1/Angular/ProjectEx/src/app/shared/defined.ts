export const SERVER_URL = "http://localhost:8080"

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
};

export type LoginDTO = {
    username: string,
    password: string
}

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

export type ProductDTO = {
    id?: number,
    name: string,
    price: number,
    description: string,
    inStock: number,
    images: Array<string>,
    category: string,
    discount: number
}



