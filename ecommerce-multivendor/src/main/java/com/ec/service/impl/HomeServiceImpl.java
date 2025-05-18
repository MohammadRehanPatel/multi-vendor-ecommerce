package com.ec.service.impl;

import com.ec.domain.HomeCategorySection;
import com.ec.model.Deal;
import com.ec.model.Home;
import com.ec.model.HomeCategory;
import com.ec.repository.DealRepository;
import com.ec.service.HomeService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HomeServiceImpl implements HomeService {

    private final DealRepository dealRepository;

    public HomeServiceImpl(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    @Override
    public Home createHomePageData(Set<HomeCategory> allCategories) {
        Set<HomeCategory> gridCategories = allCategories.stream()
                .filter(category-> category.getSection()== HomeCategorySection.GRID)
                .collect(Collectors.toSet());


        Set<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category-> category.getSection()== HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toSet());

        Set<HomeCategory> electricCategories = allCategories.stream()
                .filter(category-> category.getSection()== HomeCategorySection.ELECTRIC_CATEGORIES)
                .collect(Collectors.toSet());

        Set<HomeCategory> dealsCategories = allCategories.stream()
                .filter(category-> category.getSection()== HomeCategorySection.DEALS)
                .collect(Collectors.toSet());

        Set<Deal> createdDeal= new HashSet<>();
        if(dealRepository.findAll().isEmpty()){
            Set<Deal> deals=allCategories.stream()
                    .filter(category-> category.getSection()==HomeCategorySection.DEALS)
                    .map(category-> new Deal(null,10,category))
                    .collect(Collectors.toSet());

            createdDeal= (Set<Deal>) dealRepository.saveAll(deals);
        }else{
            createdDeal= new HashSet<>(dealRepository.findAll());
        }

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createdDeal);
        home.setDealCategories(dealsCategories);
        return home;
    }
}
