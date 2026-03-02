import bai2Video from "../assets/phan_ung_hoa_hoc_nang_luong_cua_phan_ung_hoa_hoc.mp4";
import dung_dich_va_nong_do_phan_1 from "../assets/dung_dich_va_nong_do_phan_1.mp4";
import dung_dich_va_nong_do_phan_2 from "../assets/dung_dich_va_nong_do_phan_2.mp4";
import mol_va_ti_khoi_chat_khi_phan_2 from "../assets/mol_va_ti_khoi_chat_khi_phan_2.mp4";
import mol_va_ti_khoi_chat_khi_phan_1 from "../assets/mol_va_ti_khoi_chat_khi_phan_1.mp4";

const lessons = [
    {
        id: 1,
        title: "BÀI 2: PHẢN ỨNG HOÁ HỌC",
        thumbnail: "../public/image/bai2.jpg",
        videoUrl: [{
            title: "",
            url: bai2Video
        }
        ]
    },
    {
        id: 2,
        title: "BÀI 3: MOL VÀ TỈ KHỐI CHẤT KHÍ",
        thumbnail: "../public/image/bai3.jpg",
        videoUrl: [
            {
                title: "PHẦN 1",
                url: mol_va_ti_khoi_chat_khi_phan_1
            },
            {
                title: "PHẦN 2",
                url: mol_va_ti_khoi_chat_khi_phan_2
            }


        ]
    },
    {
        id: 3,
        title: "BÀI 4: DUNG DỊCH VÀ NỒNG ĐỘ",
        thumbnail: "../public/image/bai4.jpg",
        videoUrl: [


            {
                title: "PHẦN 1",
                url: dung_dich_va_nong_do_phan_1
            },
            {
                title: "PHẦN 2",
                url: dung_dich_va_nong_do_phan_2
            }

        ]
    },

];

export default lessons;