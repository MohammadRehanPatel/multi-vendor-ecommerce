package com.ec.service.impl;

import com.ec.config.JwtProvider;
import com.ec.domain.USER_ROLE;
import com.ec.model.Cart;
import com.ec.model.Seller;
import com.ec.model.User;
import com.ec.model.VerificationCode;
import com.ec.repository.CartRepository;
import com.ec.repository.SellerRepository;
import com.ec.repository.UserRepository;
import com.ec.repository.VerificationCodeRepository;
import com.ec.request.LoginRequest;
import com.ec.request.SignupRequest;
import com.ec.response.AuthResponse;
import com.ec.service.AuthService;
import com.ec.service.EmailService;
import com.ec.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImpl customUserService;
    private final CartRepository cartRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final JwtProvider jwtProvider;
    private final EmailService emailService;
    private final SellerRepository sellerRepository;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomUserServiceImpl customUserService, CartRepository cartRepository, VerificationCodeRepository verificationCodeRepository,
                           JwtProvider jwtProvider, EmailService emailService, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserService = customUserService;
        this.cartRepository = cartRepository;
        this.verificationCodeRepository = verificationCodeRepository;
        this.jwtProvider = jwtProvider;
        this.emailService = emailService;
        this.sellerRepository = sellerRepository;
    }

    @Override
    public String createUser(SignupRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(request.getOtp())) {
            throw new Exception("Wrong otp");
        }

        if (user == null) {
            User createdUser = new User();
            createdUser.setEmail(request.getEmail());
            createdUser.setFullName(request.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("845454545");
            createdUser.setPassword(passwordEncoder.encode(request.getOtp()));

            user = userRepository.save(createdUser);
            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);


        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);


        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sentLoginOtp(String email,USER_ROLE role) throws Exception {
        String SIGNING_PREFIX = "signin_";

        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());
            if(role.equals(USER_ROLE.ROLE_SELLER)){
                Seller seller    = sellerRepository.findByEmail(email);
                if(seller==null) {
                    throw new Exception("Seller not found");
                }


            }else {

                User user = userRepository.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not exist with provided email");
                }
            }
        }

        VerificationCode isExist = verificationCodeRepository.findByEmail(email);

        if (isExist != null) {
            verificationCodeRepository.delete(isExist);

        }

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);

        verificationCodeRepository.save(verificationCode);

        String subject = "Multi Vendor login/SignUp OTP";
        String text = "Your login/signup otp is - " + otp;
        emailService.sendVerificationOtpEmail(email, otp, subject, text);

    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String otp = req.getOtp();

        Authentication authentication = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Success");

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        authResponse.setRole(USER_ROLE.valueOf(roleName));

        return authResponse;
    }

    private Authentication authenticate(String username, String otp) throws Exception {
        UserDetails userDetails = customUserService.loadUserByUsername(username);
        String SELLER_PREFIX = "seller_";
        if(username.startsWith(SELLER_PREFIX)){
            username = username.substring(SELLER_PREFIX.length());
        }
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username!");
        }
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong OTP!!");
        }


        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
