package com.webnc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class FileUploadController {

    // Thư mục lưu ảnh (Nó sẽ tự tạo ở ngang hàng với thư mục src)
    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Kiểm tra xem file có rỗng không
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Vui lòng chọn một file ảnh!");
            }

            // 2. Tạo thư mục 'uploads' nếu nó chưa tồn tại
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 3. Đổi tên file để không bị trùng (dùng UUID)
            // Ví dụ: anh_cu.jpg -> 123e4567-e89b-12d3..._anh_cu.jpg
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

            // 4. Lưu file vào ổ cứng
            Path filePath = Paths.get(UPLOAD_DIR + uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            // 5. Tạo đường link URL để trả về cho Client
            // Chú ý: Cấu hình này đang chạy ở localhost:8080
            String fileUrl = "http://localhost:8080/images/" + uniqueFileName;

            // Trả về link ảnh
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Lỗi khi lưu file: " + e.getMessage());
        }
    }
}