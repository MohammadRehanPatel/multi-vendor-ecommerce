package com.ec.controller;

import com.ec.exception.DealException;
import com.ec.model.Deal;
import com.ec.response.ApiResponse;
import com.ec.service.DealService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/deals")
public class DealController {

    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }


    @PostMapping()
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal){
        Deal createdDeal = dealService.createDeal(deal);

        return new ResponseEntity<>(createdDeal, HttpStatus.ACCEPTED);
    }
    @GetMapping()
    public ResponseEntity<List<Deal>> getAllDeal(){
        List<Deal> deals = dealService.getDeals();

        return new ResponseEntity<>(deals, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeal( @PathVariable Long id , @RequestBody Deal deal) throws DealException {
        Deal updatedDeal = dealService.updateDeal(deal,id   );
        return ResponseEntity.ok(updatedDeal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeal(@PathVariable Long id) throws DealException {
        dealService.deleteDeal(id);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Deal Deleted!");

        return new ResponseEntity<>(apiResponse,HttpStatus.NO_CONTENT);
    }

}
