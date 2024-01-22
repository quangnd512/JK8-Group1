export interface UpdateUserDto {
    ten: string;
    ngaySinh: Date;
    sdt: string;
    email: string;
    diaChi: string;
    taiKhoan?: TaiKhoan; // Dấu "?" chỉ định rằng trường này có thể không xuất hiện
}

interface TaiKhoan {
    tenTk: string;
    matKhau: string;
    role: string;
    daXoa: boolean;
}

