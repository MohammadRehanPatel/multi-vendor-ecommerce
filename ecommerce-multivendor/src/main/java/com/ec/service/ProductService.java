package com.ec.service;

import com.ec.exception.ProductException;
import com.ec.model.Product;
import com.ec.request.CreateProductRequest;
import com.ec.model.Seller;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest product, Seller seller) throws IllegalAccessException;

    void deleteProduct(Long productId) throws ProductException;

    Product updateProduct(Long productId, Product product) throws ProductException;

    Product findProductById(Long productId) throws ProductException;

    Page<Product> getAllProducts(String category, String brand, String colors, String size,
                                 Integer minPrice, Integer maxPrice, Integer minDiscount,
                                 String sort, String stock, Integer pageNumber);

    List<Product> searchProducts(String query);

    List<Product> getProductBySellerId(Long sellerId);

}
