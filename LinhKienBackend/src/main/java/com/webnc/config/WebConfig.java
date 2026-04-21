package com.webnc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ánh xạ đường dẫn web "/images/**" vào thư mục vật lý "uploads" nằm ở thư mục gốc của project
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/");
    }
}