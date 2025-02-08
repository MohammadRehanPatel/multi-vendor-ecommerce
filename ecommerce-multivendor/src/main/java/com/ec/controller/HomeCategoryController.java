package com.ec.controller;

import com.ec.exception.HomeCategoryException;
import com.ec.model.Home;
import com.ec.model.HomeCategory;
import com.ec.service.HomeCategoryService;
import com.ec.service.HomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    public HomeCategoryController(HomeCategoryService homeCategoryService, HomeService homeService) {
        this.homeCategoryService = homeCategoryService;
        this.homeService = homeService;
    }

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategories
            ){
        List<HomeCategory> categories= homeCategoryService.createCategories(homeCategories);
        Home home =homeService.createHomePageData(categories);

        return new ResponseEntity<>(home, HttpStatus.CREATED);
    }
    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() {
        List<HomeCategory> categories= homeCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable Long id, @RequestBody HomeCategory homeCategory)
            throws HomeCategoryException {
        HomeCategory updatedCategory = homeCategoryService.updateCategory(homeCategory,id);
        return ResponseEntity.ok(updatedCategory);
    }


}
