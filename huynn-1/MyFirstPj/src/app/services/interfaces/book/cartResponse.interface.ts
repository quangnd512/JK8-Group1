import { ListBookResponse } from "./listBookResponse.interface";

export interface CartResponse {
    maGioHang: number,
    tongTien: number,
    daThanhToan: boolean,
    docGia: any,
    sachs: ListBookResponse[]
}