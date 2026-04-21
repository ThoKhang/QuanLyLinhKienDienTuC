package com.webnc.config;

import com.webnc.until.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Lấy thẻ Token từ Request Header của Postman
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7); // Cắt bỏ chữ "Bearer "
            try {
                // Đọc thông tin từ Token
                Claims claims = jwtUtil.extractAllClaims(jwt);
                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                // Cấp quyền vào hệ thống Spring Security
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            username, null, Collections.singletonList(authority));
                    
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception e) {
                System.out.println("Thẻ Token không hợp lệ hoặc đã hết hạn: " + e.getMessage());
            }
        }
        // Cho phép đi tiếp
        chain.doFilter(request, response);
    }
}