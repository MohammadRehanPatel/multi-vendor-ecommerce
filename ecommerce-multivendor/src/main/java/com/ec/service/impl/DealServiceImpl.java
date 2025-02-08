package com.ec.service.impl;

import com.ec.exception.DealException;
import com.ec.model.Deal;
import com.ec.model.HomeCategory;
import com.ec.repository.DealRepository;
import com.ec.repository.HomeCategoryRepository;
import com.ec.service.DealService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    public DealServiceImpl(DealRepository dealRepository, HomeCategoryRepository homeCategoryRepository) {
        this.dealRepository = dealRepository;
        this.homeCategoryRepository = homeCategoryRepository;
    }

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
        Deal newdeal = dealRepository.save(deal);
        newdeal.setCategory(category);
        newdeal.setDiscount(deal.getDiscount());
        return dealRepository.save(deal) ;
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws DealException {

        Deal existingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if(existingDeal!=null){
            if(deal.getDiscount()!=null){
                existingDeal.setDiscount(deal.getDiscount());
            }
            if(category!=null){
                existingDeal.setCategory(category);
            }
            return dealRepository.save(existingDeal);
        }

        throw new DealException("Deal not found");
    }

    @Override
    public void deleteDeal(Long id) throws DealException {
        Deal deal = dealRepository.findById(id).orElseThrow(()->new DealException("Deal not found"));
        dealRepository.delete(deal);
    }
}
