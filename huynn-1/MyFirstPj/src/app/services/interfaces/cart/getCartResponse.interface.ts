import { BookResponse } from "../book/bookResponse.interface";
import { ListBookResponse } from "../book/listBookResponse.interface";

export interface getCartResponse {
    maGioHang: number,
    tongTien: number,
    daThanhToan: boolean,
    maDocGia: number,
    tenDocGia: string,
    diaChi: string,
    maTaiKhoan: number,
    tenTaiKhoang: string,
    sachList: BookResponse[]
}