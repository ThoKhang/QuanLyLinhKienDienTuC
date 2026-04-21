package com.webnc.entity;

import java.time.LocalDateTime;

public class ChatSession {

    private int idSession;

    private String userId;

    // Quan hệ với ApplicationUser (đã chuyển đổi trước đó)
    private ApplicationUser user;

    private String title = "Cuộc trò chuyện mới";

    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructor không tham số
    public ChatSession() {
    }

    // Constructor đầy đủ tham số
    public ChatSession(int idSession, String userId, ApplicationUser user, String title, LocalDateTime createdAt) {
        this.idSession = idSession;
        this.userId = userId;
        this.user = user;
        this.title = title;
        this.createdAt = createdAt;
    }

    // Getter và Setter
    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ApplicationUser getUser() {
        return user;
    }

    public void setUser(ApplicationUser user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}