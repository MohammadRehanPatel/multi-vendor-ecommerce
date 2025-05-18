package com.ec.service;

import com.ec.model.Home;
import com.ec.model.HomeCategory;

import java.util.List;
import java.util.Set;

public interface HomeService {

    Home createHomePageData(Set<HomeCategory> allCategories);

}
