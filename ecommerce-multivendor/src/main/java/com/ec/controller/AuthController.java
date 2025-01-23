package com.ec.controller;

import com.ec.domain.USER_ROLE;
import com.ec.model.User;
import com.ec.model.VerificationCode;
import com.ec.repository.UserRepository;
import com.ec.request.LoginOtpRequest;
import com.ec.request.LoginRequest;
import com.ec.request.SignupRequest;
import com.ec.response.ApiResponse;
import com.ec.response.AuthResponse;
import com.ec.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    public AuthController(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest request) throws Exception {

        String jwt = authService.createUser(request);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("register success");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest request) throws Exception {

      authService.sentLoginOtp(request.getEmail(),request.getRole());
        ApiResponse res = new ApiResponse();

        res.setMessage("Opt send successfully");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request) throws Exception {

        AuthResponse authResponse = authService.signing(request);

        return ResponseEntity.ok(authResponse);
    }


}
