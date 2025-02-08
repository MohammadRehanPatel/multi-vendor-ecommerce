package com.ec.service;

import com.ec.model.Home;
import com.ec.model.HomeCategory;

import java.util.List;

public interface HomeService {

    Home createHomePageData(List<HomeCategory> allCategories);

}
