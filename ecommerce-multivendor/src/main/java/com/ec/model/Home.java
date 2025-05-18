package com.ec.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;


public class Home {

    private Set<HomeCategory> grid;
    private Set<HomeCategory> shopByCategories;
    private Set<HomeCategory> electricCategories;
    private Set<HomeCategory> dealCategories;
    private Set<Deal> deals;

    public Home() {
    }

    public Set<HomeCategory> getGrid() {
        return grid;
    }

    public void setGrid(Set<HomeCategory> grid) {
        this.grid = grid;
    }

    public Set<HomeCategory> getShopByCategories() {
        return shopByCategories;
    }

    public void setShopByCategories(Set<HomeCategory> shopByCategories) {
        this.shopByCategories = shopByCategories;
    }

    public Set<HomeCategory> getElectricCategories() {
        return electricCategories;
    }

    public void setElectricCategories(Set<HomeCategory> electricCategories) {
        this.electricCategories = electricCategories;
    }

    public Set<HomeCategory> getDealCategories() {
        return dealCategories;
    }

    public void setDealCategories(Set<HomeCategory> dealCategories) {
        this.dealCategories = dealCategories;
    }

    public void setDeals(Set<Deal> deals) {
        this.deals = deals;
    }

    public Set<Deal> getDeals() {
        return deals;
    }

    public Home(Set<HomeCategory> grid, Set<HomeCategory> shopByCategories,
                Set<HomeCategory> electricCategories, Set<HomeCategory> dealCategories, Set<Deal> deals) {
        this.grid = grid;
        this.shopByCategories = shopByCategories;
        this.electricCategories = electricCategories;
        this.dealCategories = dealCategories;
        this.deals = deals;
    }

}
