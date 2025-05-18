package com.ec.service;

import com.ec.exception.HomeCategoryException;
import com.ec.model.HomeCategory;

import java.util.List;
import java.util.Set;

public interface HomeCategoryService {

    HomeCategory createHomeCategory(HomeCategory  homeCategory);

    Set<HomeCategory> createCategories(Set<HomeCategory> homeCategories);

    HomeCategory updateCategory(HomeCategory homeCategory,Long id) throws HomeCategoryException;
    Set<HomeCategory> getAllCategories();


}
