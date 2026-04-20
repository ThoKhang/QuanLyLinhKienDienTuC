package com.webnc.config;

import org.springframework.beans.factory.annotation.Autowired; // Thêm import
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // Thêm import

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Gọi JwtFilter vào đây
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .cors(cors -> cors.disable()) 
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() 
                .requestMatchers("/error").permitAll() 
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN") // Bắt buộc quyền ADMIN
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated() 
                
            );

        // LẮP MÁY QUÉT: Yêu cầu Spring chạy cái bộ lọc Token của mình trước
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
}