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

export const GET_BOOK_PAGINAION_URI = "/lay-sach-phantrang";

export const GET_BOOK_PAGINAION_BY_TYPE_URI = "/lay-sach-phantrang-theo-theloai";

export const GET_BOOK_DETAIL_URI = "/chi-tiet-sach";

export const GET_BOOK_BY_TYPE_URI = "/sach-theo-the-loai";

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
export const DELETE_USER = '/admin/xoa-doc-gia';

//check out
export const CHECK_OUT_URL = '/tao-phieu-muon-tra';

//book reciept
export const GET_BORROW_BOOK_RECIEPT_URI = '/admin/get-all-phieu-muon';
export const GET_RETURN_BOOK_RECIEPT_URI = '/admin/get-all-phieu-tra';
export const GET_BORROW_BOOK_BY_ID_URL = '/admin/get-phieu-muon';
export const CREATE_BOOK_RETURN_RECIPT_URI = '/admin/tra-sach'

//user-page
export const GET_ALL_CHECKOUTS_URI = "/lay-phieu-muon-tra";

// upload image
export  const UPLOAD_IMAGE_URI = "/cloudinary/upload";



