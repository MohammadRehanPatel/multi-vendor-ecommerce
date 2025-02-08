package com.ec.controller;

import com.ec.domain.AccountStatus;
import com.ec.exception.SellerException;
import com.ec.model.Seller;
import com.ec.service.SellerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController {
    private final SellerService sellerService;

    public AdminController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(
            @PathVariable Long id,
            @PathVariable AccountStatus status
            ) throws SellerException{
        Seller updatedSeller = sellerService.updateSellerAccountStatus(id,status);
        return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
    }



}
