package com.ec.controller;

import com.ec.exception.CouponException;
import com.ec.exception.UserException;
import com.ec.model.Cart;
import com.ec.model.Coupon;
import com.ec.model.User;
import com.ec.service.CartService;
import com.ec.service.CouponService;
import com.ec.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminCouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    public AdminCouponController(CouponService couponService, UserService userService, CartService cartService) {
        this.couponService = couponService;
        this.userService = userService;
        this.cartService = cartService;
    }

    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(
            @RequestParam String apply,
            @RequestParam String code,
            @RequestParam double orderValue,
            @RequestHeader("Authorization") String jwt

    ) throws UserException, CouponException {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart ;
        if(apply.equals("true")){
            cart = couponService.applyCoupon(code,orderValue,user);
        }else {
            cart= couponService.removeCoupon(code,user);
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon){
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return  new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws CouponException {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted Successfully");
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> findAllCoupons(){
        return ResponseEntity.ok(couponService.findAllCoupon());
    }

}
