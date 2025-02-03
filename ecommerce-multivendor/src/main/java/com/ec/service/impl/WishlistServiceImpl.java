package com.ec.service.impl;

import com.ec.model.Product;
import com.ec.model.User;
import com.ec.model.Wishlist;
import com.ec.repository.WishlistRepository;
import com.ec.service.WishlistService;
import org.springframework.stereotype.Service;

@Service
public class WishlistServiceImpl implements WishlistService  {

    private final WishlistRepository wishlistRepository;

    public WishlistServiceImpl(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist  wishlist  = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishlistByUser(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if(wishlist==null){
           wishlist = createWishlist(user);
        }
        return wishlist;
    }

    @Override
    public Wishlist addProductToWishlist(User user, Product product) {

        Wishlist wishlist = getWishlistByUser(user);
        if(wishlist.getProducts().contains(product)){
            wishlist.getProducts().remove(product);
        }else{
            wishlist.getProducts().add(product);
        }

        return wishlistRepository.save(wishlist);
    }
}
