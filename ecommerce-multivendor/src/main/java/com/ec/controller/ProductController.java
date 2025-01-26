package com.ec.controller;


import com.ec.exception.ProductException;
import com.ec.model.Category;
import com.ec.model.Product;
import com.ec.model.Seller;
import com.ec.request.CreateProductRequest;
import com.ec.service.ProductService;
import com.ec.service.SellerService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    private final SellerService sellerService;

    public ProductController(ProductService productService, SellerService sellerService) {
        this.productService = productService;
        this.sellerService = sellerService;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) throws ProductException {
        Product product = productService.findProductById(productId);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam(required = false) String query) {

        return new ResponseEntity<>(productService.searchProducts(query), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String category, @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color, @RequestParam(required = false) String sizes,
            @RequestParam(required = false) Integer minPrice, @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount, @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock, @RequestParam(defaultValue = "0") Integer pageNumber) {

        return new ResponseEntity<>(productService.getAllProducts(category, brand, color, sizes, minPrice,
                maxPrice, minDiscount, sort, stock, pageNumber), HttpStatus.OK);

    }


    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) throws ProductException {
        return null;
    }


}
