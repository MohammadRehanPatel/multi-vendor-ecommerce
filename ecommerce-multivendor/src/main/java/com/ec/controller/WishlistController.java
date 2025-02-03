package com.ec.controller;

import com.ec.exception.ProductException;
import com.ec.exception.UserException;
import com.ec.model.Product;
import com.ec.model.User;
import com.ec.model.Wishlist;
import com.ec.service.ProductService;
import com.ec.service.UserService;
import com.ec.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private  final WishlistService wishlistService;
    private final ProductService productService;
    private final UserService userService;

    public WishlistController(WishlistService wishlistService, ProductService productService, UserService userService) {
        this.wishlistService = wishlistService;
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<Wishlist> getWishlistByUserId(
            @RequestHeader("Authorization") String jwt
    )throws UserException{

        User user =userService.findUserByJwtToken(jwt);
        Wishlist  wishlist   = wishlistService.getWishlistByUser(user);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishList(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws ProductException, UserException {
        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        Wishlist updatedWishList =wishlistService.addProductToWishlist(user,product);

        return ResponseEntity.ok(updatedWishList);
    }




}
