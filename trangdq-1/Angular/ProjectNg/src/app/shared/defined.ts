export type User = {
    username: string;
    role: "ROLE_ADMIN" | "ROLE_USER" | undefined
}
export type ErrorMessage = {
    message?: string;
}

export type Book = {
    id: number,
    name: string,
    price: number,
    description: string,
    inStock: number,
    images: Array<string>
    category: string,
    discount: number
}

export type Response = {
    content: Array<Book>
}

export const SERVER_URL = "http://localhost:8080"

