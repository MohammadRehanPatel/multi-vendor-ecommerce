package com.ec.service;

import com.ec.domain.USER_ROLE;
import com.ec.request.LoginRequest;
import com.ec.request.SignupRequest;
import com.ec.response.AuthResponse;

public interface AuthService {
    String createUser(SignupRequest req) throws Exception;
    void sentLoginOtp(String email, USER_ROLE role) throws Exception;

    AuthResponse signing(LoginRequest req) throws Exception;

}
