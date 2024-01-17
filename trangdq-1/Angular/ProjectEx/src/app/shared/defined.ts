export const SERVER_URL = "http://localhost:8080"

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
    images: Array<string>
    category: string,
    discount: number
}

