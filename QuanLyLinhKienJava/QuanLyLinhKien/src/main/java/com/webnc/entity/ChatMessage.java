package com.webnc.entity;

import java.time.LocalDateTime;

public class ChatMessage {

    private int idMessage;

    private int idSession;

    // Quan hệ với ChatSession (Đã chuyển đổi ở các bước trước)
    private ChatSession session;

    // Vai trò: 'user', 'admin' hoặc 'system' (C#: nvarchar(20))
    private String role;

    // Nội dung tin nhắn (C#: nvarchar(max))
    private String message;

    // Thời gian tạo, mặc định là hiện tại giống DateTime.Now
    private LocalDateTime createdAt = LocalDateTime.now();

    // 1. Constructor không tham số
    public ChatMessage() {
    }

    // 2. Constructor đầy đủ tham số
    public ChatMessage(int idMessage, int idSession, ChatSession session, String role, String message, LocalDateTime createdAt) {
        this.idMessage = idMessage;
        this.idSession = idSession;
        this.session = session;
        this.role = role;
        this.message = message;
        this.createdAt = createdAt;
    }

    // 3. Getter và Setter
    public int getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(int idMessage) {
        this.idMessage = idMessage;
    }

    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    public ChatSession getSession() {
        return session;
    }

    public void setSession(ChatSession session) {
        this.session = session;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}