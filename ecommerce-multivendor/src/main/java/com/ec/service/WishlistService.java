package com.ec.service;

import com.ec.model.Product;
import com.ec.model.User;
import com.ec.model.Wishlist;

public interface WishlistService {

    Wishlist createWishlist(User user);

    Wishlist getWishlistByUser(User user);
    Wishlist addProductToWishlist(User user, Product product);

}
