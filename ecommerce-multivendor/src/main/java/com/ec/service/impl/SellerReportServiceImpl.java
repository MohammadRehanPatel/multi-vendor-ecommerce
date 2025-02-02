package com.ec.service.impl;

import com.ec.model.Seller;
import com.ec.model.SellerReport;
import com.ec.repository.SellerReportRepository;
import com.ec.service.SellerReportService;
import org.springframework.stereotype.Service;

@Service

public class SellerReportServiceImpl implements SellerReportService {


    private SellerReportRepository sellerReportRepository;

    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());

        if(sellerReport==null){
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);
            return sellerReportRepository.save(newReport);
        }
        return sellerReport;

    }

    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {


        return sellerReportRepository.save(sellerReport);
    }



}
