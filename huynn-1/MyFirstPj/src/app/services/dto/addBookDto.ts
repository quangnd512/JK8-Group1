import { Author } from "../interfaces/author.interface";
import { BookType } from "../interfaces/bookType/bookType.interface";

export interface addBookDto {
    tenSach: string;
    soLuong: number;
    ngayXuatBan: string;
    giaTien: number;
    theLoai: any;
    nhaXuatBan: any;
    image: string;
    tacGia: any;
}