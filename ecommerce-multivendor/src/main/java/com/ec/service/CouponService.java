package com.ec.service;

import com.ec.exception.CouponException;
import com.ec.model.Cart;
import com.ec.model.Coupon;
import com.ec.model.User;

import java.util.List;

public interface CouponService {

    Cart applyCoupon(String code, double orderValue, User user) throws CouponException;

    Cart removeCoupon(String code,User user) throws CouponException;

    Coupon findCouponById(Long id) throws CouponException;

    Coupon createCoupon(Coupon coupon);
    List<Coupon> findAllCoupon();

    void deleteCoupon(Long id) throws CouponException;

}
