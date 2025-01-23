package com.ec.controller;

import com.ec.config.JwtProvider;
import com.ec.domain.AccountStatus;
import com.ec.model.Seller;
import com.ec.model.SellerReport;
import com.ec.model.VerificationCode;
import com.ec.repository.VerificationCodeRepository;
import com.ec.request.LoginOtpRequest;
import com.ec.request.LoginRequest;
import com.ec.response.ApiResponse;
import com.ec.response.AuthResponse;
import com.ec.service.AuthService;
import com.ec.service.EmailService;
import com.ec.service.SellerService;
import com.ec.service.impl.CustomUserServiceImpl;
import com.ec.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final CustomUserServiceImpl customUserService;
    private final EmailService emailService;

    public SellerController(SellerService sellerService, VerificationCodeRepository verificationCodeRepository, AuthService authService, JwtProvider jwtProvider,
                            CustomUserServiceImpl customUserService, EmailService emailService) {
        this.sellerService = sellerService;
        this.verificationCodeRepository = verificationCodeRepository;
        this.authService = authService;
        this.jwtProvider = jwtProvider;
        this.customUserService = customUserService;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {

        String otp = req.getOtp();
        String email = req.getEmail();

        req.setEmail("seller_"+email);
        AuthResponse authResponse = authService.signing(req);


        return new ResponseEntity<>(authResponse, HttpStatus.OK );
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception{
        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);
        if(verificationCode ==null || !verificationCode.getOtp().equals(otp)){
            throw new Exception("Wrong Otp");
        }
        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);

        return  new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller)throws Exception{
        Seller savedSeller = sellerService.createSeller(seller);

        String otp= OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(seller.getEmail());

        verificationCodeRepository.save(verificationCode);

        String subject = "Multi Vendor login/SignUp OTP";
        String text = "Your login/signup otp is - " + otp;
        String frontend_url = "hhtp://localhost:3000/verify-seller/";
        emailService.sendVerificationOtpEmail(seller.getEmail(), otp, subject, text + frontend_url);

        return new ResponseEntity<>(savedSeller,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id )throws  Exception{
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);

        return new ResponseEntity<>(seller,HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller = sellerService.getSellerByEmail(email);
        SellerReport report = null;
        return new ResponseEntity<>(report , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(
            @RequestParam(required = false)AccountStatus status
            ){
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Seller  seller
    ) throws Exception{
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updateSeller = sellerService.updateSeller(profile.getId(),seller);
        return ResponseEntity.ok(updateSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id)throws Exception{
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }



}
