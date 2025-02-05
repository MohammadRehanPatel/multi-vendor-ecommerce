package com.ec.service.impl;

import com.ec.exception.CouponException;
import com.ec.model.Cart;
import com.ec.model.Coupon;
import com.ec.model.User;
import com.ec.repository.CartRepository;
import com.ec.repository.CouponRepository;
import com.ec.repository.UserRepository;
import com.ec.service.CouponService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public CouponServiceImpl(CouponRepository couponRepository, CartRepository cartRepository, UserRepository userRepository) {
        this.couponRepository = couponRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws CouponException {
        Coupon coupon = couponRepository.findByCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());
        if (coupon == null) {
            throw new CouponException("Coupon not valid");
        }
        if (user.getUsedCoupons().contains(coupon)) {
            throw new CouponException("Coupon Already Used");
        }
        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new CouponException("valid for minimum order value" + coupon.getMinimumOrderValue());

        }
        if (coupon.isActive() &&
                LocalDate.now().isAfter(coupon.getValidityStartDate()) &&
                LocalDate.now().isBefore(coupon.getValidityEndDate())) {
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);
            return cart;

        }
        throw new CouponException("Coupon not valid");
    }

    @Override
    public Cart removeCoupon(String code, User user) throws CouponException {
        Coupon coupon = couponRepository.findByCode(code);
        if (coupon == null) {
            throw new CouponException("Coupon not found!!");
        }
        Cart cart = cartRepository.findByUserId(user.getId());
        double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountedPrice);
        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws CouponException {
        return couponRepository.findById(id)
                .orElseThrow(() -> new CouponException("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('Admin')")
    public Coupon createCoupon(Coupon coupon) {

        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupon() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('Admin')")
    public void deleteCoupon(Long id) throws CouponException {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
