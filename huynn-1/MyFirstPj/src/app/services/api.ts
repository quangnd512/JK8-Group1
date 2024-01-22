export const BASE_URL = "http://localhost:3000"

export const BOOKS_URI = BASE_URL.concat("/books")

export const USERS_URI = BASE_URL.concat('/userInfos')

export const CART_URI = BASE_URL.concat('/carts')

export const BASE__URL = "http://localhost:9000/api/v1"

// authentication URI
export const LOGIN__URI = "/dang-nhap";
export const ADD_ACCOUNT_URI = "/them-tai-khoan";

// get books
export const GET_NEW_BOOK_URI = "/sach-moi";

export const GET_ALL_BOOK_URI = "/tat-ca";

export const GET_BOOK_DETAIL_URI = "/chi-tiet-sach";

// add book
export const ADD_BOOK_URI = "/them-sach"

// update book
export const UPDATE_BOOK_URI = '/cap-nhat-sach'
 
// delete book
export const DELETE_BOOK_URI = "/xoa-sach";

// carts
export const ADD_BOOK_TO_CART_URI = "/them-vao-gio-hang";
export const GET_CART_URI = "/lay-gio-hang";
export const REMOVE_BOOK_FROM_CART_URI = "/xoa-sach-khoi-gio-hang";

// user
export const GET_ALL_USERS_URI = '/admin/find-all-doc-gia';
export const GET_USER_URI = '/lay-thong-tin';
export const UPDATE_USER_URI = '/cap-nhat-thong-tin';

//check out
export const CHECK_OUT_URL = '/tao-phieu-muon-tra';

