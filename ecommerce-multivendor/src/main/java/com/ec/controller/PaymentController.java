package com.ec.controller;

import com.ec.exception.PaymentException;
import com.ec.exception.SellerException;
import com.ec.exception.UserException;
import com.ec.model.*;
import com.ec.response.ApiResponse;
import com.ec.response.PaymentLinkResponse;
import com.ec.service.*;
import com.razorpay.RazorpayException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private PaymentService paymentService;
    private UserService userService;
    private SellerReportService sellerReportService;
    private SellerService sellerService;
    private TransactionService transactionService;

    public PaymentController(PaymentService paymentService, UserService userService, SellerReportService sellerReportService,
                             SellerService sellerService, TransactionService transactionService) {
        this.paymentService = paymentService;
        this.userService = userService;
        this.sellerReportService = sellerReportService;
        this.sellerService = sellerService;
        this.transactionService = transactionService;
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader("Authorization") String jwt
    ) throws PaymentException, UserException, RazorpayException, SellerException {
        User user = userService.findUserByJwtToken(jwt);
        PaymentLinkResponse paymentLinkResponse ;
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        boolean paymentSucces = paymentService.proceedPaymentOrder(
                paymentOrder,paymentId,paymentLinkId
        );

        if(paymentSucces){
            for(Order order: paymentOrder.getOrders()){

                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);
                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings()+order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales()+order.getOrderItems().size());
                sellerReportService.updateSellerReport(report);
            }
        }
        ApiResponse res = new ApiResponse();
        res.setMessage("Payment Successful");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }




}
