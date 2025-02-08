package com.ec.service;

import com.ec.exception.HomeCategoryException;
import com.ec.model.HomeCategory;

import java.util.List;

public interface HomeCategoryService {

    HomeCategory createHomeCategory(HomeCategory  homeCategory);

    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);

    HomeCategory updateCategory(HomeCategory homeCategory,Long id) throws HomeCategoryException;
    List<HomeCategory> getAllCategories();


}
