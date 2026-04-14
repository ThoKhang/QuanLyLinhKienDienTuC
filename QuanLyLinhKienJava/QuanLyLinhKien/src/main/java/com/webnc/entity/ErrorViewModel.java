package com.webnc.entity;

public class ErrorViewModel {

    private String requestId;

    // 1. Constructor không tham số
    public ErrorViewModel() {
    }

    // 2. Constructor có tham số
    public ErrorViewModel(String requestId) {
        this.requestId = requestId;
    }

    // 3. Getter và Setter cho requestId
    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    // 4. Computed Getter - Tương đương với logic:
    // public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    public boolean isShowRequestId() {
        // Trong Java, ta phải kiểm tra cả null và chuỗi rỗng
        return requestId != null && !requestId.isEmpty();
    }
}