package com.ec.service;

import com.ec.exception.DealException;
import com.ec.model.Deal;

import java.util.List;

public interface DealService {

    List<Deal> getDeals();

    Deal createDeal(Deal deal);
    Deal updateDeal(Deal deal,Long id) throws DealException;
    void deleteDeal(Long  id) throws DealException;



}
