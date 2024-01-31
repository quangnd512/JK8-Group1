export const SERVER_NO_AUTH_URL: string = "http://localhost:8080/api/v1/no-auth";
export const SERVER_ADMIN_URL: string = "http://localhost:8080/api/v1/ad";
export const SERVER_MANAGER_URL: string = "http://localhost:8080/api/v1/mn";
export const SERVER_EMP_URL: string = "http://localhost:8080/api/v1/emp";
export const SERVER_USER_URL: string = "http://localhost:8080/api/v1/u";
export const SERVER_ALL_URL: string = "http://localhost:8080/api/v1/all";


export type LoginDTO = {
    username: string;
    password: string;
}

export type ErrorMessage = {
    message? : string;
}
