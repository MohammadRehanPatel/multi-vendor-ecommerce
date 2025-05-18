package com.ec.service.impl;

import com.ec.model.Cart;
import com.ec.model.CartItem;
import com.ec.model.Product;
import com.ec.model.User;
import com.ec.repository.CartItemRepository;
import com.ec.repository.CartRepository;
import com.ec.service.CartService;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    private CartItemRepository cartItemRepository;
    private CartRepository cartRepository;

    public CartServiceImpl(CartItemRepository cartItemRepository, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity)  {
        Cart cart = findUserCart(user);

        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart,product,size);
        if(isPresent==null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice=quantity* product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity*product.getMrpPrice());
            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);
        }
        return isPresent;
    }

    @Override
    public Cart findUserCart(User user)  {
        Cart cart = cartRepository.findByUserId(user.getId());
        Set<CartItem> cartItems = new HashSet<>(cart.getCartItems());
        int totalPrice =0;
        int totalDiscountedPrice =0;
        int totalItem =0;

        for (CartItem cartItem : cartItems){
            totalPrice+=cartItem.getMrpPrice();
            totalDiscountedPrice+=cartItem.getSellingPrice();
            totalItem+=cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItems(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice,totalDiscountedPrice));

        return cart;
    }

    private int calculateDiscountPercentage(double mrpPrice, double sellingPrice)  {
        if(mrpPrice<0){
            throw new IllegalArgumentException("Actual price must be greater than 0");
        }
        double discount = mrpPrice-sellingPrice;
        double discountPercentage = (discount/mrpPrice) *100;

        return (int) discountPercentage;

    }
}
