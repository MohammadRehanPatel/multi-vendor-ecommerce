package com.ec.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class ApiResponse {

    private String message;

    public String getMessage() {
        return message;
    }

    public ApiResponse() {
    }

    public ApiResponse(String message) {
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
