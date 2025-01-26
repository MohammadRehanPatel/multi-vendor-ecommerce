package com.ec.service;

import com.ec.model.Cart;
import com.ec.model.CartItem;
import com.ec.model.Product;
import com.ec.model.User;

public interface CartService {

    CartItem addCartItem(
            User user,
            Product product ,
            String size,
            int quantity
    );

    Cart findUserCart(User user);


}
