package com.webnc.entity;

import java.util.Collection;
import java.util.List;

public class ApplicationUser {
    // Trong Java, thay vì kế thừa IdentityUser, ta định nghĩa các field cơ bản 
    // hoặc kế thừa từ một BaseEntity nếu bạn có.
    private String id;
    private String userName;
    private String email;
    private String phoneNumber;
    
    private String hoTen;
    private String soNha;
    private String idPhuongXa;

    // Quan hệ 1-1 hoặc N-1 với XaPhuong
    private XaPhuong xaPhuong;

    // Quan hệ 1-N với DonDatHang (ICollection -> List hoặc Set)
    private List<DonDatHang> donDatHangs;

    private boolean isOtpVerified = false;

    // Constructor không tham số
    public ApplicationUser() {
    }

    // Getter và Setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }

    public String getSoNha() { return soNha; }
    public void setSoNha(String soNha) { this.soNha = soNha; }

    public String getIdPhuongXa() { return idPhuongXa; }
    public void setIdPhuongXa(String idPhuongXa) { this.idPhuongXa = idPhuongXa; }

    public XaPhuong getXaPhuong() { return xaPhuong; }
    public void setXaPhuong(XaPhuong xaPhuong) { this.xaPhuong = xaPhuong; }

    public List<DonDatHang> getDonDatHangs() { return donDatHangs; }
    public void setDonDatHangs(List<DonDatHang> donDatHangs) { this.donDatHangs = donDatHangs; }

    public boolean isIsOtpVerified() { return isOtpVerified; }
    public void setIsOtpVerified(boolean isOtpVerified) { this.isOtpVerified = isOtpVerified; }
}