package com.webnc.entity;

public class OrderInfoModel {

    // Đổi chữ cái đầu thành viết thường (camelCase)
    private String fullName;
    private String orderId;
    private String orderInfo;
    private double amount;

    // 1. Constructor không tham số
    public OrderInfoModel() {
    }

    // 2. Constructor đầy đủ tham số
    public OrderInfoModel(String fullName, String orderId, String orderInfo, double amount) {
        this.fullName = fullName;
        this.orderId = orderId;
        this.orderInfo = orderInfo;
        this.amount = amount;
    }

    // 3. Getter và Setter
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(String orderInfo) {
        this.orderInfo = orderInfo;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}