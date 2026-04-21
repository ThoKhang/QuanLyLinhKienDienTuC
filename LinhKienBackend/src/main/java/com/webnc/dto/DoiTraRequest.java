package com.webnc.dto;

import lombok.Data;

@Data
public class DoiTraRequest {
    private Long donHangId;
    private String lyDo;
    // Chuỗi JSON chứa link ảnh (Ví dụ: "['url1.jpg', 'url2.jpg']")
    private String hinhAnhMinhHoa; 
}