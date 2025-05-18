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
import java.util.Set;

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
            @RequestBody Set<HomeCategory> homeCategories
            ){
        Set<HomeCategory> categories= homeCategoryService.createCategories(homeCategories);
        Home home =homeService.createHomePageData(categories);

        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }
    @GetMapping("/admin/home-category")
    public ResponseEntity<Set<HomeCategory>> getHomeCategory() {
        Set<HomeCategory> categories= homeCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable Long id, @RequestBody HomeCategory homeCategory)
            throws HomeCategoryException {
        HomeCategory updatedCategory = homeCategoryService.updateCategory(homeCategory,id);
        return ResponseEntity.ok(updatedCategory);
    }


}
