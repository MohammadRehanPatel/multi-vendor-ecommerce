package com.ec.request;

import lombok.*;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Getter
@Setter
public class SignupRequest {
    private String email;
    private String fullName;
    private String otp;

    public SignupRequest(String email, String fullName, String otp) {
        this.email = email;
        this.fullName = fullName;
        this.otp = otp;
    }

    public SignupRequest(){}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
