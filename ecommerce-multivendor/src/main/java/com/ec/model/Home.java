package com.ec.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class Home {

    private List<HomeCategory> grid;
    private List<HomeCategory> shopByCategories;
    private List<HomeCategory> electricCategories;
    private List<HomeCategory> dealCategories;
    private List<Deal> deals;

    public Home() {
    }

    public List<HomeCategory> getGrid() {
        return grid;
    }

    public void setGrid(List<HomeCategory> grid) {
        this.grid = grid;
    }

    public List<HomeCategory> getShopByCategories() {
        return shopByCategories;
    }

    public void setShopByCategories(List<HomeCategory> shopByCategories) {
        this.shopByCategories = shopByCategories;
    }

    public List<HomeCategory> getElectricCategories() {
        return electricCategories;
    }

    public void setElectricCategories(List<HomeCategory> electricCategories) {
        this.electricCategories = electricCategories;
    }

    public List<HomeCategory> getDealCategories() {
        return dealCategories;
    }

    public void setDealCategories(List<HomeCategory> dealCategories) {
        this.dealCategories = dealCategories;
    }

    public List<Deal> getDeals() {
        return deals;
    }

    public void setDeals(List<Deal> deals) {
        this.deals = deals;
    }

    public Home(List<HomeCategory> grid, List<HomeCategory> shopByCategories,
                List<HomeCategory> electricCategories, List<HomeCategory> dealCategories, List<Deal> deals) {
        this.grid = grid;
        this.shopByCategories = shopByCategories;
        this.electricCategories = electricCategories;
        this.dealCategories = dealCategories;
        this.deals = deals;
    }
}
