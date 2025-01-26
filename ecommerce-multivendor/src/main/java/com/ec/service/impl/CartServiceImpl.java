package com.ec.service.impl;

import com.ec.model.Cart;
import com.ec.model.CartItem;
import com.ec.model.Product;
import com.ec.model.User;
import com.ec.repository.CartItemRepository;
import com.ec.repository.CartRepository;
import com.ec.service.CartService;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private CartItemRepository cartItemRepository;
    private CartRepository cartRepository;

    public CartServiceImpl(CartItemRepository cartItemRepository, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        return null;
    }

    @Override
    public Cart findUserCart(User user) {
        return null;
    }
}
