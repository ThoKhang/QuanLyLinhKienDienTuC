package com.webnc.entity;

public class AdminCreateUser {
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;
    private String roleName;

    // Constructor không tham số
    public AdminCreateUser() {}

    // Constructor có tham số
    public AdminCreateUser(String userName, String email, String phoneNumber, String password, String roleName) {
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.roleName = roleName;
    }

    // Getter và Setter
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
}