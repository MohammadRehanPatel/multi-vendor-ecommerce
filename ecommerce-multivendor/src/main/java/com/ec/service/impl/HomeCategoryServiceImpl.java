package com.ec.service.impl;

import com.ec.exception.HomeCategoryException;
import com.ec.model.HomeCategory;
import com.ec.repository.HomeCategoryRepository;
import com.ec.service.HomeCategoryService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;

    public HomeCategoryServiceImpl(HomeCategoryRepository homeCategoryRepository) {
        this.homeCategoryRepository = homeCategoryRepository;
    }

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public Set<HomeCategory> createCategories(Set<HomeCategory> homeCategories) {
        if(homeCategoryRepository.findAll().isEmpty()){
            return (Set<HomeCategory>) homeCategoryRepository.saveAll(homeCategories);
        }
        return  homeCategoryRepository.findAll().stream().collect(Collectors.toSet());
    }

    @Override
    public HomeCategory updateCategory(HomeCategory homeCategory, Long id) throws HomeCategoryException {
        HomeCategory updatedCategory = homeCategoryRepository
                .findById(id).orElseThrow(()-> new HomeCategoryException("Home Category Not found"));
        if(homeCategory.getImage()!=null){

        updatedCategory.setImage(homeCategory.getImage());
        }
        if(homeCategory.getCategoryId()!=null){
            updatedCategory.setCategoryId(homeCategory.getCategoryId());
        }
//        updatedCategory.setName(homeCategory.getName());
//        updatedCategory.setSection(homeCategory.getSection());

        return homeCategoryRepository.save(updatedCategory);
    }

    @Override
    public Set<HomeCategory> getAllCategories() {
        return new HashSet<>(homeCategoryRepository.findAll());
    }
}
